declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string;
            email?: string;
            nid?: string;
            contact?: string;
            role?: string;
            image?: string;
        };
    }

    interface User {
        id: string;
        nid: string;
        contact: string;
        role?: string;
    }
}
