const base_url = "https://reqres.in/api";

export async function login(email, password) {
  try {
    const req = await fetch(`${base_url}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const resp = await req.json();
    if (req.status === 400) {
      throw new Error(resp.error);
    }
    return resp;
  } catch(err) {
    throw Error(err.message);
  }
}

export async function saveUser(user) {
  try {
    const req = await fetch(`${base_url}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...user})
    });
    const resp = await req.json();
    if (req.status === 400) {
      throw new Error(resp.error);
    }
    return resp;
  } catch(err) {
    throw Error(err.message);
  }
}

export async function updateUser(user) {
  try {
    const req = await fetch(`${base_url}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...user})
    });
    const resp = await req.json();
    return resp;
  } catch(err) {
    throw new Error(err);
  }
}

export async function deleteUser(userId) {
  try {
    await fetch(`${base_url}/users/${userId}`, {
      method: 'DELETE',
    });
    return userId;
  } catch(err) {
    throw new Error(err);
  }
}

export async function getUsers(page = 1) {
  try {
    const req = await fetch(`${base_url}/users?page=${page}`);
    const resp = await req.json();
    return resp;
  } catch(err) {
    throw new Error(err);
  }
}

export async function getUser(id) {
  try {
    const req = await fetch(`${base_url}/users/${id}`);
    const resp = await req.json();
    return resp.data;
  } catch(err) {
    throw new Error(err);
  }
}