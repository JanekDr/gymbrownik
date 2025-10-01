"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            email: "jan.kowalski@example.com",
            name: "Jan Kowalski",
            trainingWeeks: {
                create: [
                    {
                        name: "Push Pull Legs Week 1",
                        workoutType: client_1.WorkoutType.PUSH_PULL_LEGS,
                        restDays: 1,
                        trainingDays: 3,
                        days: {
                            create: [
                                {
                                    dayOfWeek: 1,
                                    workout: {
                                        create: {
                                            name: "Push Day",
                                            exercises: {
                                                create: [
                                                    {
                                                        name: "Bench Press",
                                                        series: 4,
                                                        reps: 8,
                                                        weight: 80.0,
                                                        rest: 120,
                                                    },
                                                    {
                                                        name: "Overhead Press",
                                                        series: 3,
                                                        reps: 10,
                                                        weight: 40.0,
                                                        rest: 90,
                                                    },
                                                    {
                                                        name: "Triceps Pushdown",
                                                        series: 3,
                                                        reps: 12,
                                                        weight: 25.0,
                                                        rest: 60,
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    dayOfWeek: 3,
                                    workout: {
                                        create: {
                                            name: "Pull Day",
                                            exercises: {
                                                create: [
                                                    {
                                                        name: "Deadlift",
                                                        series: 4,
                                                        reps: 6,
                                                        weight: 100.0,
                                                        rest: 180,
                                                    },
                                                    {
                                                        name: "Pull Ups",
                                                        series: 4,
                                                        reps: 10,
                                                        weight: 0.0,
                                                        rest: 120,
                                                    },
                                                    {
                                                        name: "Barbell Row",
                                                        series: 3,
                                                        reps: 10,
                                                        weight: 60.0,
                                                        rest: 90,
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    dayOfWeek: 5,
                                    workout: {
                                        create: {
                                            name: "Leg Day",
                                            exercises: {
                                                create: [
                                                    {
                                                        name: "Squat",
                                                        series: 4,
                                                        reps: 8,
                                                        weight: 90.0,
                                                        rest: 150,
                                                    },
                                                    {
                                                        name: "Leg Press",
                                                        series: 3,
                                                        reps: 12,
                                                        weight: 120.0,
                                                        rest: 120,
                                                    },
                                                    {
                                                        name: "Calf Raises",
                                                        series: 4,
                                                        reps: 15,
                                                        weight: 40.0,
                                                        rest: 60,
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        include: {
            trainingWeeks: {
                include: {
                    days: {
                        include: {
                            workout: {
                                include: {
                                    exercises: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    console.log("Seeding completed.");
}
main()
    .catch((error) => {
    console.error(error);
    throw error;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map