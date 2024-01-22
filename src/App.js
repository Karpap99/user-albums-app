import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserAlbumsApp() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleViewAlbums = (userId) => {
    axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => {
        setAlbums(response.data);
        setSelectedUserId(userId);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
      });
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <br></br>
            <button onClick={() => handleViewAlbums(user.id)}>Get Albums</button>
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div>
          <h2>Albums</h2>
          <ul>
            {albums.map(album => (
              <li key={album.id}>{album.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserAlbumsApp;

