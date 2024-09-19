// src/mock/mockData.ts

export interface Address {
  country: string;
  street: string;
  suburb: string;
}

export interface House {
  _id: string;
  name: string;
  address: Address;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  images: { picture_url: string };
  reviews: {
    _id: string;
    reviewer_name: string;
    comments: string;
    date: Date;
  }[];
}

const mockHouses: House[] = [
  {
    _id: "1",
    name: "Cozy Cottage",
    address: { country: "USA", street: "123 Maple St", suburb: "Springfield" },
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    images: { picture_url: "https://via.placeholder.com/150" },
    reviews: [
      {
        _id: "r1",
        reviewer_name: "Alice Johnson",
        comments: "Wonderful stay!",
        date: new Date("2024-01-01T10:00:00Z"),
      },
    ],
  },
  {
    _id: "2",
    name: "Beachfront Villa",
    address: { country: "Spain", street: "456 Ocean Drive", suburb: "Malaga" },
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    images: { picture_url: "https://via.placeholder.com/150" },
    reviews: [
      {
        _id: "r2",
        reviewer_name: "Bob Smith",
        comments: "Amazing view and great location.",
        date: new Date("2024-02-15T15:00:00Z"),
      },
    ],
  },
  {
    _id: "3",
    name: "Mountain Retreat",
    address: { country: "Canada", street: "789 Alpine Rd", suburb: "Whistler" },
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    images: { picture_url: "https://via.placeholder.com/150" },
    reviews: [
      {
        _id: "r3",
        reviewer_name: "Carol White",
        comments: "A perfect escape from the city.",
        date: new Date("2024-03-10T08:00:00Z"),
      },
    ],
  },
];

export default mockHouses;
