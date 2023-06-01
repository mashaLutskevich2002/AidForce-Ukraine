export interface User {
    _id: string;
    name: string;
    last_name: string;
    email: string;
    role: string;
    phone: string;
    photoUrl: string;
    token: string;
    createdAt: string;
}

export const useAuthUser = () => {
    const userInfo = localStorage.getItem('userInfo');
    let user: User | null = null;

    if (userInfo) {
        user = JSON.parse(userInfo);
    }

    return {
        user,
    };
};
