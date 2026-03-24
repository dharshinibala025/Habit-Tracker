const API_URL = 'http://localhost:5000/api';

export const api = {
    // Auth
    login: (credentials) => fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(res => res.json()),

    register: (userData) => fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }).then(res => res.json()),

    // Users
    getUsers: () => fetch(`${API_URL}/users`).then(res => res.json()),
    getUser: (userId) => fetch(`${API_URL}/users/${userId}`).then(res => res.json()),
    createUser: (name) => fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    }).then(res => res.json()),
    updateUser: (id, data) => fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Habits
    getHabits: (userId) => fetch(`${API_URL}/habits/${userId}`).then(res => res.json()),
    createHabit: (userId, habitData) => fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...habitData })
    }).then(res => res.json()),
    toggleHabit: (id, date) => fetch(`${API_URL}/habits/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date })
    }).then(res => res.json()),
    deleteHabit: (id) => fetch(`${API_URL}/habits/${id}`, { method: 'DELETE' }),

    // Exams
    getExams: (userId) => fetch(`${API_URL}/exams/${userId}`).then(res => res.json()),
    createExam: (data) => fetch(`${API_URL}/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    deleteExam: (id) => fetch(`${API_URL}/exams/${id}`, { method: 'DELETE' }),

    // Study Plans
    getPlans: (userId) => fetch(`${API_URL}/plans/${userId}`).then(res => res.json()),
    createPlan: (data) => fetch(`${API_URL}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    togglePlan: (id) => fetch(`${API_URL}/plans/${id}/toggle`, { method: 'PATCH' }),
    deletePlan: (id) => fetch(`${API_URL}/plans/${id}`, { method: 'DELETE' }),

    // Special Tasks
    getTasks: (userId) => fetch(`${API_URL}/tasks/${userId}`).then(res => res.json()),
    createTask: (userId, text) => fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text })
    }).then(res => res.json()),
    toggleTask: (id) => fetch(`${API_URL}/tasks/${id}/toggle`, { method: 'PATCH' }),
    updateTask: (id, text) => fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    }).then(res => res.json()),
    deleteTask: (id) => fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' }),

    deleteTask: (id) => fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' }),
};
