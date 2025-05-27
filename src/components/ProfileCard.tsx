import React from 'react';
import { Instagram, ExternalLink, Users } from 'lucide-react';
import { InstagramProfile } from '../types';

interface ProfileCardProps {
  profile: InstagramProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10 border border-gray-800 hover:border-purple-900">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Instagram size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-white truncate max-w-[200px]">
                @{profile.handle}
              </h3>
              <p className="text-xs text-purple-300 flex items-center gap-1">
                <Users size={12} />
                {profile.followerCount}
              </p>
            </div>
          </div>
          <a 
            href={profile.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-pink-400 transition-colors"
            aria-label={`Visit ${profile.handle} Instagram profile`}
          >
            <ExternalLink size={18} />
          </a>
        </div>
        
        {profile.snippet && (
          <p className="text-sm text-gray-300 line-clamp-2 mt-2">
            {profile.snippet}
          </p>
        )}
        
        <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center">
          <span className="text-xs text-gray-500">Result #{profile.position}</span>
          <a 
            href={profile.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-medium text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1"
          >
            View Profile <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;