export interface Room {
    totalRooms: number,
    availableRooms: number;
    bookedRooms: number;
}

export interface RoomList {
    roomNumber?: string;
    roomType: string;
    amenities: string;
    price: number;
    photoes: string;
    checkinTime: Date;
    checkoutTime: Date;
    rating: number;
}