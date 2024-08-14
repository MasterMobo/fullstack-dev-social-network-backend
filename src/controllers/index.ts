// TODO: Please add import/export here

// Auth
export { default as login } from "./auth/login"
export { default as register } from "./auth/register"

// Friend
export { default as getFriends } from "./friend/getFriends"
export { default as deleteFriendship } from "./friendship/deleteFriendship"

// Friendship
export { default as createFriendRequest } from "./friendship/createFriendRequest"
export { default as getFriendships } from "./friendship/getFriendships"
export { default as acceptFriendRequest } from "./friendship/acceptFriendRequest"

// Profile
export { default as getProfile } from "./profile/getProfile"

// User
export { default as getMe } from "./user/getMe"