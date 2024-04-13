import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { imgSets } from "./imgSets";

const prisma = new PrismaClient();

type User = {
  id: string;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  name: string | null;
  bio: string;
  created_at: Date;
};

const userCount = 64; // TODO : Change this parameter

async function createUsers() {
  const users = [];

  for (let i = 0; i < userCount; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    const user = await prisma.user.create({
      data: {
        username,
        email,
        image: faker.image.avatar(),
        name: faker.person.fullName(),
        bio: faker.person.bio(),
        created_at: faker.date.past(),
      },
    });

    users.push(user);
  }

  return users;
}

async function createFollowRelations(users: User[]) {
  for (const user of users) {
    const followCount = faker.number.int({ min: 0, max: userCount });
    const follows = faker.helpers
      .arrayElements(users, followCount)
      .filter((u) => u.id !== user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          createMany: { data: follows.map((u) => ({ followeeId: u.id })) },
        },
      },
    });
    // await prisma.user.update({
    //   where: { username: "ksaka" },
    //   data: {
    //     followedBy: {
    //       create: { followerId: user.id },
    //     },
    //   },
    // });
  }
}

const postUserCount = 20; // TODO : Change this parameter

async function createPosts(users: User[]) {
  let imgIndex = 0;
  for (const user of users.slice(0, postUserCount)) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        posts: {
          create: {
            imgFront: imgSets[imgIndex % imgSets.length],
            imgBack: imgSets[imgIndex % imgSets.length],
            caption: faker.lorem.lines(),
            createdAt: faker.date.past(),
          },
        },
      },
    });
    imgIndex++;
  }
}

// async function hishiwatPosts() {
//   for (let i = 0; i < 9; i++) {
//     await prisma.user.update({
//       where: { username: "hishiwat" },
//       data: {
//         posts: {
//           create: {
//             imgFront: "",
//             imgBack: "",
//             caption: faker.lorem.lines(),
//           },
//         },
//       },
//     });
//   }
// }

async function main() {
  const users = await createUsers();
  await createFollowRelations(users);
  await createPosts(users);
  // await hishiwatPosts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
