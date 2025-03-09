
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Agent } from '@/types/agent';
import AgentMapPopup from './AgentMapPopup';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface AgentMapProps {
  agents: Agent[];
}

const AgentMap: React.FC<AgentMapProps> = ({ agents }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState<[number, number]>([0, 0]);
  const navigate = useNavigate();

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Utiliser le token Mapbox
      mapboxgl.accessToken = "pk.eyJ1IjoibWFyY2dhbGxvbm5vb3ZpbW8iLCJhIjoiY204MGVxZGp2MHQwaDJpc2E4N3hqb2lscCJ9.0xzWL6xP3sdy__klOQWCdg";
      
      // Debug logs
      console.log("Initializing map with token:", mapboxgl.accessToken);
      console.log("Map container exists:", !!mapContainer.current);
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [2.213749, 46.227638], // Centre de la France
        zoom: 5.5, // Zoom légèrement augmenté pour mieux voir la France
        bounds: [
          [-5.5591, 41.3233], // Sud-ouest de la France
          [9.5595, 51.1485]   // Nord-est de la France
        ],
        fitBoundsOptions: {
          padding: 50,
        }
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      );

      // Ajouter un gestionnaire d'événements pour détecter si la carte se charge correctement
      map.current.on('load', () => {
        console.log("Map loaded successfully");
        // Forcer un redimensionnement car parfois la carte n'occupe pas tout l'espace
        if (map.current) {
          setTimeout(() => {
            map.current?.resize();
          }, 100);
        }
      });

      map.current.on('error', (e) => {
        console.error("Map error:", e);
      });
    } catch (error) {
      console.error("Failed to initialize map:", error);
    }

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Naviguer vers le profil de l'agent
  const handleAgentClick = (agent: Agent) => {
    navigate(`/agent/${agent.id}`);
  };

  // Ajouter les marqueurs des agents
  useEffect(() => {
    if (!map.current || agents.length === 0) return;

    console.log("Adding markers for", agents.length, "agents");

    // S'assurer que la carte est chargée
    const onMapLoad = () => {
      if (!map.current) return;

      // Supprimer les marqueurs existants
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());
      
      // Ajouter les nouveaux marqueurs
      agents.forEach(agent => {
        if (!map.current) return;
        
        if (!agent.longitude || !agent.latitude) {
          console.warn(`Agent ${agent.name} has invalid coordinates:`, agent.longitude, agent.latitude);
          return;
        }
        
        console.log(`Adding marker for ${agent.name} at [${agent.longitude}, ${agent.latitude}]`);
        
        const markerElement = document.createElement('div');
        markerElement.className = 'agent-marker flex items-center justify-center rounded-full bg-noovimo-500 text-white border-2 border-white shadow-md w-10 h-10 cursor-pointer overflow-hidden';
        
        // Utiliser la photo de l'agent si disponible, sinon afficher ses initiales
        if (agent.photo) {
          const img = document.createElement('img');
          img.src = agent.photo;
          img.className = 'w-full h-full object-cover';
          img.alt = agent.name;
          markerElement.appendChild(img);
        } else {
          markerElement.innerHTML = `<span>${agent.name.charAt(0)}${agent.name.split(' ')[1]?.charAt(0) || ''}</span>`;
        }
        
        // Créer le marqueur
        try {
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([agent.longitude, agent.latitude])
            .addTo(map.current);
          
          // Ajouter l'événement de clic
          markerElement.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêcher la propagation pour éviter les conflits

            // Si on fait un double-clic sur le marqueur, naviguer vers le profil
            if (e.detail === 2) {
              handleAgentClick(agent);
              return;
            }
            
            setSelectedAgent(agent);
            setPopupCoordinates([agent.longitude, agent.latitude]);
            setPopupOpen(true);
            
            // Si un popup existe déjà, le fermer
            if (popupRef.current) {
              popupRef.current.remove();
            }
            
            // Créer un popup
            popupRef.current = new mapboxgl.Popup({ closeButton: false })
              .setLngLat([agent.longitude, agent.latitude])
              .setDOMContent(document.createElement('div'))
              .addTo(map.current);
            
            // Centrer la carte sur le marqueur
            map.current.flyTo({
              center: [agent.longitude, agent.latitude],
              zoom: 9
            });
          });
        } catch (error) {
          console.error(`Error creating marker for agent ${agent.name}:`, error);
        }
      });
      
      // Définir les limites de la France
      const franceBounds = new mapboxgl.LngLatBounds([
        [-5.5591, 41.3233], // Sud-ouest de la France
        [9.5595, 51.1485]   // Nord-est de la France
      ]);
      
      // Vérifier si les agents sont en France
      let hasAgentsInFrance = false;
      agents.forEach(agent => {
        if (agent.longitude >= -5.5591 && agent.longitude <= 9.5595 && 
            agent.latitude >= 41.3233 && agent.latitude <= 51.1485) {
          hasAgentsInFrance = true;
          franceBounds.extend([agent.longitude, agent.latitude]);
        }
      });
      
      // Si des agents sont en France, ajuster la vue
      if (hasAgentsInFrance) {
        map.current.fitBounds(franceBounds, {
          padding: 50,
          maxZoom: 12
        });
      } else {
        // Sinon, centrer sur la France
        map.current.flyTo({
          center: [2.213749, 46.227638],
          zoom: 5
        });
      }
    };

    if (map.current.loaded()) {
      onMapLoad();
    } else {
      map.current.on('load', onMapLoad);
    }

    // Ajouter un gestionnaire d'événements pour redimensionner la carte si la fenêtre change de taille
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [agents, navigate]);

  // Gestion de la fermeture du popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    popupRef.current?.remove();
    popupRef.current = null;
  };

  return (
    <div className="relative h-[500px] w-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {popupOpen && selectedAgent && popupRef.current && document.querySelector('.mapboxgl-popup-content') && (
        createPortal(
          <AgentMapPopup 
            agent={selectedAgent} 
            onClose={handleClosePopup} 
            onViewProfile={() => handleAgentClick(selectedAgent)} 
          />,
          document.querySelector('.mapboxgl-popup-content') as HTMLElement
        )
      )}
    </div>
  );
};

export default AgentMap;
