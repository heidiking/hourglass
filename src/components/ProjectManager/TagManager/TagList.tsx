
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ProjectTag } from '../types';

interface TagListProps {
  tags: ProjectTag[];
  onRemoveTag: (tagId: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onRemoveTag }) => {
  if (tags.length === 0) {
    return <p className="text-sm text-gray-500">No tags yet</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map(tag => (
        <Badge 
          key={tag.id}
          className={`${tag.color} flex items-center gap-1 px-2 py-1`}
        >
          <span className="text-white">{tag.name}</span>
          <X 
            size={12} 
            className="ml-1 cursor-pointer text-white" 
            onClick={() => onRemoveTag(tag.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
