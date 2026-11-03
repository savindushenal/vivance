import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function daysFromToday(days: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
}

async function main() {
  await db.event.deleteMany();
  await db.scheduleItem.deleteMany();

  await db.event.createMany({
    data: [
      {
        title: "Christmas Carol Concert",
        slug: "christmas-carol-concert",
        description:
          "Celebrate the season with a candlelit evening of traditional carols, festive anthems and audience sing-alongs. Refreshments will be served after the concert.",
        date: daysFromToday(30),
        startTime: "18:30",
        endTime: "20:30",
        venue: "St. Mary's Church",
      },
      {
        title: "Spring Choral Festival",
        slug: "spring-choral-festival",
        description:
          "Join choirs from across the region for a day of workshops and performances, finishing with a massed-choir finale.",
        date: daysFromToday(75),
        startTime: "10:00",
        endTime: "17:00",
        venue: "City Town Hall",
      },
      {
        title: "Gospel & Spirituals Night",
        slug: "gospel-spirituals-night",
        description:
          "An uplifting evening of gospel classics and spirituals, accompanied by piano, bass and drums.",
        date: daysFromToday(120),
        startTime: "19:00",
        endTime: "21:00",
        venue: "Community Arts Centre",
      },
      {
        title: "Easter Sunrise Service",
        slug: "easter-sunrise-service",
        description:
          "The choir led music for the Easter sunrise service, including Handel's 'Hallelujah' chorus and a selection of Easter hymns.",
        date: daysFromToday(-60),
        startTime: "06:00",
        endTime: "07:30",
        venue: "Galle Face Green",
      },
      {
        title: "Annual Summer Concert",
        slug: "annual-summer-concert",
        description:
          "Our annual summer concert featured Mozart's Requiem alongside contemporary works by Eric Whitacre and Ola Gjeilo. Thank you to everyone who filled the hall!",
        date: daysFromToday(-120),
        startTime: "19:00",
        endTime: "21:30",
        venue: "Lionel Wendt Theatre",
      },
      {
        title: "Charity Fundraiser Evening",
        slug: "charity-fundraiser-evening",
        description:
          "A relaxed evening of songs from stage and screen raising funds for the children's hospital. Together we raised over LKR 500,000.",
        date: daysFromToday(-200),
        startTime: "18:00",
        endTime: "21:00",
        venue: "Hilton Ballroom",
      },
    ],
  });

  const schedule = [];
  for (let week = 0; week < 8; week++) {
    schedule.push({
      title: "Weekly rehearsal",
      type: "REHEARSAL",
      date: daysFromToday(week * 7 + 2),
      startTime: "19:00",
      endTime: "21:00",
      location: "St. Mary's Parish Hall",
      notes: week === 0 ? "Bring your Christmas concert folders." : null,
    });
  }
  schedule.push(
    {
      title: "Sectional – Sopranos & Altos",
      type: "REHEARSAL",
      date: daysFromToday(5),
      startTime: "10:00",
      endTime: "12:00",
      location: "Music Room",
      notes: null,
    },
    {
      title: "Sunday Mass",
      type: "SERVICE",
      date: daysFromToday(10),
      startTime: "08:00",
      endTime: "09:30",
      location: "St. Mary's Church",
      notes: "Arrive 30 minutes early for warm-up.",
    },
    {
      title: "Christmas Carol Concert",
      type: "PERFORMANCE",
      date: daysFromToday(30),
      startTime: "18:30",
      endTime: "20:30",
      location: "St. Mary's Church",
      notes: "Call time 5:00 PM. Concert dress.",
    },
  );
  await db.scheduleItem.createMany({ data: schedule });

  if ((await db.inquiry.count()) === 0) {
    await db.inquiry.create({
      data: {
        name: "Nimali Perera",
        email: "nimali@example.com",
        phone: "+94 71 555 0101",
        subject: "Joining the choir",
        message: "Hi! I sang alto in my school choir and would love to join. Are you accepting new members?",
      },
    });
  }

  if ((await db.booking.count()) === 0) {
    await db.booking.create({
      data: {
        name: "Ashan Fernando",
        email: "ashan@example.com",
        phone: "+94 77 555 0202",
        eventType: "WEDDING",
        eventDate: daysFromToday(45),
        eventTime: "16:00",
        venue: "All Saints' Church, Borella",
        expectedGuests: 150,
        message: "We would love the choir to sing during the ceremony – around 4 songs including 'Ave Maria'.",
      },
    });
  }

  console.log("Seeded events, schedule and sample inquiry/booking.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
