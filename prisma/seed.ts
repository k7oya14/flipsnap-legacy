import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

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
        follows: {
          connect: follows.map((u) => ({ id: u.id })),
        },
      },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: {
        follows: {
          connect: [
            // { username: "k7oya14" },
            { username: "hishiwat" },
          ],
        },
      },
    });
  }
}

const postUserCount = 11; // TODO : Change this parameter

async function createPosts(users: User[]) {
  for (const user of users.slice(0, postUserCount)) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        posts: {
          // create: Array.from({
          //   length: faker.number.int({ min: 1, max: 100 }), // TODO : Change this parameter
          // }).map(() => {
          //   const imgSize = [
          //     [1080, 1080],
          //     [1080, 566],
          //     [1080, 1350],
          //   ];
          //   const [width, height] =
          //     imgSize[faker.number.int({ min: 0, max: 2 })];
          //   return {
          //     imgFront: faker.image.url({ width, height }),
          //     imgBack: faker.image.url({ width, height }),
          //     caption: faker.lorem.lines(),
          //     createdAt: faker.date.past(),
          //   };
          // }),
          create: {
            imgFront: "",
            imgBack: "",
            caption: faker.lorem.lines(),
            createdAt: faker.date.past(),
          },
        },
      },
    });
  }
}

async function hishiwatPosts() {
  for (let i = 0; i < 9; i++) {
    await prisma.user.update({
      where: { username: "hishiwat" },
      data: {
        posts: {
          create: {
            imgFront: "",
            imgBack: "",
            caption: faker.lorem.lines(),
          },
        },
      },
    });
  }
}

async function main() {
  const users = await createUsers();
  await createFollowRelations(users);
  await createPosts(users);
  // hishiwatPosts();
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
