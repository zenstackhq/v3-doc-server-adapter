import { ClientContract } from "@zenstackhq/orm";
import { SchemaType } from "./zenstack/schema";
import { inspect } from "util";

export async function createUsersAndPosts(db: ClientContract<SchemaType>) {
    // user1 with 1 post
    await db.user.create({
        data: {
            id: 1,
            email: 'u1@test.com',
            posts: {
                create: [
                    { id: 1, title: 'Post1' },
                ]
            }
        },
        include: { posts: true }
    });

    // user2 with two posts
    await db.user.create({
        data: {
            id: 2,
            email: 'u2@test.com',
            posts: {
                create: [
                    { id: 2, title: 'Post2' },
                    { id: 3, title: 'Post3', published: true },
                ]
            }
        },
        include: { posts: true }
    });
}
