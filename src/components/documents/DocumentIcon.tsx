
import React from 'react';
import {
  FileText,
  File,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FolderOpen
} from 'lucide-react';

interface DocumentIconProps {
  type: string;
  size?: number;
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ type, size = 18 }) => {
  if (type === 'folder') {
    return <FolderOpen size={size} className="text-blue-500" />;
  }

  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText size={size} className="text-red-500" />;
    case 'docx':
    case 'doc':
    case 'word':
      return <FileText size={size} className="text-blue-500" />;
    case 'xlsx':
    case 'xls':
    case 'excel':
      return <FileSpreadsheet size={size} className="text-green-500" />;
    case 'pptx':
    case 'ppt':
    case 'powerpoint':
      return <FileText size={size} className="text-orange-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return <FileImage size={size} className="text-purple-500" />;
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'webm':
    case 'mkv':
      return <FileVideo size={size} className="text-pink-500" />;
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return <FileAudio size={size} className="text-yellow-500" />;
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return <File size={size} className="text-gray-500" />;
    case 'html':
    case 'css':
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'json':
      return <FileCode size={size} className="text-cyan-500" />;
    default:
      return <File size={size} className="text-gray-500" />;
  }
};

export default DocumentIcon;
