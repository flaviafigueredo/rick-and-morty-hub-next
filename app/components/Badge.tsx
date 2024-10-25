import React from 'react';

interface BadgeProps {
    type: 'status' | 'species' | 'gender'
    value: string
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
    let badgeClass = 'badge border-0 text-white';

    switch (type) {
        case 'status':
            switch (value) {
                case 'Alive':
                    badgeClass += ' bg-green-500';
                    break;
                case 'Dead':
                    badgeClass += ' bg-red-500';
                    break;
                case 'unknown':
                    badgeClass += ' bg-gray-500';
                    break;
                default:
                    badgeClass += ' bg-gray-300';
                    break;
            }            
            break;

        case 'species':
            switch (value) {
                case 'Human':
                    badgeClass += ' bg-blue-500';
                    break;
                case 'Alien':
                    badgeClass += ' bg-purple-500';
                    break;
                case 'Humanoid':
                    badgeClass += ' bg-green-700';
                    break;
                case 'unknown':
                    badgeClass += ' bg-gray-500';
                    break;
                case 'Poopybutthole':
                    badgeClass += ' bg-yellow-500';
                    break;
                case 'Mythological Creature':
                    badgeClass += ' bg-yellow-700';
                    break;
                case 'Animal':
                    badgeClass += ' bg-amber-700';
                    break;
                case 'Robot':
                    badgeClass += ' bg-gray-700';
                    break;
                case 'Cronenberg':
                    badgeClass += ' bg-red-700';
                    break;
                case 'Disease':
                    badgeClass += ' bg-green-500';
                    break;
                default:
                    badgeClass += ' bg-gray-300';
                    break;
            }
            break;

        case 'gender':
            switch (value) {
                case 'Male':
                    badgeClass += ' bg-blue-600';
                    break;
                case 'Female':
                    badgeClass += ' bg-pink-600';
                    break;
                case 'unknown':
                    badgeClass += ' bg-gray-600';
                    break;
                case 'Genderless':
                    badgeClass += ' bg-green-600';
                    break;
                default:
                    badgeClass += ' bg-yellow-600';
                    break;
            }
            break;
            
        default:
            badgeClass += ' bg-gray-300';
            break;
    }

    return (
        <span className={badgeClass} aria-label={`${type}: ${value}`}>
            {value}
        </span>
    );
};