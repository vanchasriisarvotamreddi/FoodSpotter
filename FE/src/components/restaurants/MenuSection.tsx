import React from 'react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <span className="text-primary-600 font-medium">${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};