import { useState } from 'react';
import { FriendsList } from './FriendsList';
import { FormAddFriend } from './FormAddFriend';
import { FormSplitBill } from './FormSplitBill';

// Base users list
const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20,
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0,
	},
];

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	// Add friend feature
	function handleShowAddFriend() {
		setShowAddFriend((show) => !show);
	}

	// Add new friend
	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend(false);
	}

	// Select friend from list to add bill
	function handleSelection(friend) {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	}

	// Split the bill
	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);

		setSelectedFriend(null);
	}

	return (
		<div className="min-h-[66vh] grid grid-cols-2 my-14 gap-x-16 items-start">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelection={handleSelection}
					selectedFriend={selectedFriend}
				/>

				{showAddFriend && (
					<FormAddFriend onAddFriend={handleAddFriend} />
				)}

				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? 'Close' : 'Add friend'}
				</Button>
			</div>

			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
					key={selectedFriend.id}
				/>
			)}
		</div>
	);
}

export function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}
