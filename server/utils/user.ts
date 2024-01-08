import { RoomTypes } from '../types/canvas';

let users: RoomTypes[] = [];

/**
 * Add user
 * @param { RoomTypes } RoomTypes - RoomTypes
 * @returns { [RoomTypes]  } RoomTypesArrays
 */

//The function is designed to add a user to a collection and return an array of users belonging to the same room.

// function parameters : The addUser function takes an object as its parameter. The object is expected to have properties corresponding to the properties defined in the RoomTypes type (name, userId, roomId, host, presenter, socketId).
export const addUser = ({
	name,
	userId,
	roomId,
	host,
	presenter,
	socketId,
}: RoomTypes): RoomTypes[] => {
	// Create a user object with the provided properties
	const user = { name, userId, roomId, host, presenter, socketId };

	// Add the user to the 'users' array
	users.push(user);

	// Return an array of users belonging to the same room
	return users.filter((user) => user.roomId === roomId);
};

/**
 * Remove User
 * @param { string } id - SockeID
 * @returns RemovedUser
 */
export const removeUser = (id: string) => {
	// Find the index of the user in the 'users' array based on the provided 'socketId'
	const index = users?.findIndex((user) => user.socketId === id);

	// if the user was found
	if (index !== -1) {

		//remove the user from the 'users' array using splice

		// "?." allows to access properties or call methods on an object that might be null or undefined without causing an error.
		// users?.splice(index, 1): This attempts to call the splice method on the users array only if users is not null or undefined. It removes one element from the array starting at the index position.
		// [0]: returns only remove element
		// The entire expression users?.splice(index, 1)[0] effectively removes one element from the array at the specified index (if the array exists and the index is valid) and returns that removed element.
		return users?.splice(index, 1)[0];
	}
};

/**
 * Get Sinngle
 * @param { string } id - UserID
 * @return User
 */
export const getUser = (id: string) => {
	return users.find((user) => user.socketId === id);
};

/**
 * Get all Users
 * @param { string } roomId - RoomId
 * @return { Array<RoomTypes> } RoomTypesArray
 */
export const getUsersInRoom = (roomId: string): Array<RoomTypes> => {
	return users.filter((user) => user.roomId === roomId);
};
