
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Agent } from '@/types/agent';
import AgentMapPopup from './AgentMapPopup';
import { createPortal } from 'react-dom';

interface AgentMapProps {
  agents: Agent[];
}

const AgentMap: React.FC<AgentMapProps> = ({ agents }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState<[number, number]>([0, 0]);

  // Demande à l'utilisateur son token Mapbox si non configuré
  useEffect(() => {
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
    }
  }, []);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
    }
  };

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
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

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Ajouter les marqueurs des agents
  useEffect(() => {
    if (!map.current || agents.length === 0) return;

    // S'assurer que la carte est chargée
    const onMapLoad = () => {
      if (!map.current) return;

      // Supprimer les marqueurs existants
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());
      
      // Ajouter les nouveaux marqueurs
      agents.forEach(agent => {
        if (!map.current) return;
        
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
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([agent.longitude, agent.latitude])
          .addTo(map.current);
        
        // Ajouter l'événement de clic
        markerElement.addEventListener('click', () => {
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
      });
      
      // Ajuster la vue pour voir tous les agents en France
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
  }, [agents, map.current]);

  // Gestion de la fermeture du popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    popupRef.current?.remove();
    popupRef.current = null;
  };

  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] p-6">
        <h3 className="text-lg font-medium mb-4">Mapbox Configuration</h3>
        <p className="text-muted-foreground mb-4 text-center">
          Pour afficher la carte, vous devez fournir un token Mapbox public.<br />
          Vous pouvez l'obtenir en créant un compte sur <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mapbox.com</a>
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              name="token"
              placeholder="Entrez votre Mapbox public token"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button 
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Configurer
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] w-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {popupOpen && selectedAgent && popupRef.current && document.querySelector('.mapboxgl-popup-content') && (
        createPortal(
          <AgentMapPopup agent={selectedAgent} onClose={handleClosePopup} />,
          document.querySelector('.mapboxgl-popup-content') as HTMLElement
        )
      )}
    </div>
  );
};

export default AgentMap;
