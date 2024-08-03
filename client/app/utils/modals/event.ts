export const EventType = {
    EVENT: 'EVENT',
    FOOD: 'FOOD',
    ROOM: 'ROOM'
}

export const AvailableEventTypes = [
    {title: 'ALL', value: 'ALL'},
    {title: 'EVENTS', value: 'EVENT'},
    {title: 'FOOD AND BEVERAGE', value: 'FOOD'},
    {title: 'ROOMS', value: 'ROOM'}
]

export interface EventModal {
    id: string;
    title: string;
    images: ImageModal[];
    eventType: 'EVENT' | 'FOOD' | 'ROOM';
    createdAt: Date;
    updatedAt: Date;
  }

export interface EventsModal {
  count: number;
  rows: EventModal[]
}

interface ImageModal {
  isCover: boolean;
  name: string,
  imageUrl: string,
  type: string,
  size: number
}