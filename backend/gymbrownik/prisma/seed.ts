import { PrismaClient, WorkoutType } from '.prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Katalog ćwiczeń
    const bench = await prisma.exercise.create({ data: { name: 'Bench Press' } });
    const ohp = await prisma.exercise.create({ data: { name: 'Overhead Press' } });
    const triceps = await prisma.exercise.create({ data: { name: 'Triceps Pushdown' } });
    const deadlift = await prisma.exercise.create({ data: { name: 'Deadlift' } });
    const pullUps = await prisma.exercise.create({ data: { name: 'Pull Ups' } });
    const row = await prisma.exercise.create({ data: { name: 'Barbell Row' } });
    const squat = await prisma.exercise.create({ data: { name: 'Squat' } });
    const legPress = await prisma.exercise.create({ data: { name: 'Leg Press' } });
    const calf = await prisma.exercise.create({ data: { name: 'Calf Raises' } });

    // 2. Workouty
    const pushWorkout = await prisma.workout.create({
        data: {
            name: 'Push Day',
            exercises: {
                create: [
                    { exerciseId: bench.id, series: 4, reps: 8, weight: 80.0, rest: 120 },
                    { exerciseId: ohp.id, series: 3, reps: 10, weight: 40.0, rest: 90 },
                    { exerciseId: triceps.id, series: 3, reps: 12, weight: 25.0, rest: 60 },
                ],
            },
        },
    });

    const pullWorkout = await prisma.workout.create({
        data: {
            name: 'Pull Day',
            exercises: {
                create: [
                    { exerciseId: deadlift.id, series: 4, reps: 6, weight: 100.0, rest: 180 },
                    { exerciseId: pullUps.id, series: 4, reps: 10, weight: 0.0, rest: 120 },
                    { exerciseId: row.id, series: 3, reps: 10, weight: 60.0, rest: 90 },
                ],
            },
        },
    });

    const legWorkout = await prisma.workout.create({
        data: {
            name: 'Leg Day',
            exercises: {
                create: [
                    { exerciseId: squat.id, series: 4, reps: 8, weight: 90.0, rest: 150 },
                    { exerciseId: legPress.id, series: 3, reps: 12, weight: 120.0, rest: 120 },
                    { exerciseId: calf.id, series: 4, reps: 15, weight: 40.0, rest: 60 },
                ],
            },
        },
    });

    // 3. Użytkownik i tydzień treningowy z dniami
    const user = await prisma.user.create({
        data: {
            email: 'jan.kowalski@example.com',
            name: 'Jan Kowalski',
            trainingWeeks: {
                create: [
                    {
                        name: 'Push Pull Legs Week 1',
                        workoutType: WorkoutType.PUSH_PULL_LEGS,
                        restDays: 1,
                        trainingDays: 3,
                        days: {
                            create: [
                                { dayOfWeek: 1, workoutId: pushWorkout.id },
                                { dayOfWeek: 3, workoutId: pullWorkout.id },
                                { dayOfWeek: 5, workoutId: legWorkout.id },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log('Seed completed ✅');
}

main()
    .catch((error: unknown) => {
        console.error(error);
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
