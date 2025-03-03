
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ProjectTag } from '../types';

interface TagListProps {
  tags: ProjectTag[];
  onRemoveTag: (tagId: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onRemoveTag }) => {
  if (!tags || tags.length === 0) {
    return <p className="text-sm text-gray-500">No tags yet</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <Badge 
          key={tag.id}
          className={`${tag.color} flex items-center gap-1 px-2 py-1`}
        >
          <span className="text-black">{tag.name}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveTag(tag.id);
            }}
            className="ml-1 cursor-pointer"
            aria-label={`Remove ${tag.name} tag`}
          >
            <X size={12} className="text-black" />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
