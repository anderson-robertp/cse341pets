


const user = {
    username,
    email,
    github_id: github_id || null,
    profile_url: profile_url || '',
    avatar_url: avatar_url || '',
    password: hashedPassword,
    created_at: new Date(),
};

// Insert the user into the database

// Check is user is unique
const existingUser = await mongodb.getDb().collection('users').findOne
({ email });
if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
}
