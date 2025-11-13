import { PrismaClient, WorkoutType, BodyPart, ExerciseStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const bench = await prisma.exercise.create({
        data: { name: 'Bench Press', bodyPart: BodyPart.CHEST, status: ExerciseStatus.CONFIRMED  },
    });
    const ohp = await prisma.exercise.create({
        data: { name: 'Overhead Press', bodyPart: BodyPart.SHOULDERS, status: ExerciseStatus.CONFIRMED },
    });
    const triceps = await prisma.exercise.create({
        data: { name: 'Triceps Pushdown', bodyPart: BodyPart.TRICEPS, status: ExerciseStatus.CONFIRMED },
    });
    const deadlift = await prisma.exercise.create({
        data: { name: 'Deadlift', bodyPart: BodyPart.BACK, status: ExerciseStatus.CONFIRMED },
    });
    const pullUps = await prisma.exercise.create({
        data: { name: 'Pull Ups', bodyPart: BodyPart.BACK, status: ExerciseStatus.CONFIRMED },
    });
    const row = await prisma.exercise.create({
        data: { name: 'Barbell Row', bodyPart: BodyPart.BACK, status: ExerciseStatus.CONFIRMED },
    });
    const squat = await prisma.exercise.create({
        data: { name: 'Squat', bodyPart: BodyPart.QUADRICEPS, status: ExerciseStatus.CONFIRMED }, 
    });
    const legPress = await prisma.exercise.create({
        data: { name: 'Leg Press', bodyPart: BodyPart.QUADRICEPS, status: ExerciseStatus.CONFIRMED },
    });
    const calf = await prisma.exercise.create({
        data: { name: 'Calf Raises', bodyPart: BodyPart.CALVES, status: ExerciseStatus.CONFIRMED },
    });
    const inclineBarbellPress = await prisma.exercise.create({
        data: { name: 'Incline Barberll Press', bodyPart: BodyPart.CHEST, status: ExerciseStatus.PENDING},
    });


    const pushWorkout = await prisma.workout.create({ data: { name: 'Push Day' } });
    const pullWorkout = await prisma.workout.create({ data: { name: 'Pull Day' } });
    const legWorkout = await prisma.workout.create({ data: { name: 'Leg Day' } });


    await prisma.workoutExercise.createMany({
        data: [
            { workoutId: pushWorkout.id, exerciseId: bench.id, series: 4, reps: 8, weight: 80.0, rest: 120 },
            { workoutId: pushWorkout.id, exerciseId: deadlift.id, series: 4, reps: 6, weight: 100.0, rest: 180 },
            { workoutId: pushWorkout.id, exerciseId: ohp.id, series: 3, reps: 10, weight: 40.0, rest: 90 },
            { workoutId: pushWorkout.id, exerciseId: triceps.id, series: 3, reps: 12, weight: 25.0, rest: 60 },

            { workoutId: pullWorkout.id, exerciseId: deadlift.id, series: 4, reps: 6, weight: 100.0, rest: 180 },
            { workoutId: pullWorkout.id, exerciseId: pullUps.id, series: 4, reps: 10, weight: 0.0, rest: 120 },
            { workoutId: pullWorkout.id, exerciseId: row.id, series: 3, reps: 10, weight: 60.0, rest: 90 },

            { workoutId: legWorkout.id, exerciseId: squat.id, series: 4, reps: 8, weight: 90.0, rest: 150 },
            { workoutId: legWorkout.id, exerciseId: legPress.id, series: 3, reps: 12, weight: 120.0, rest: 120 },
            { workoutId: legWorkout.id, exerciseId: calf.id, series: 4, reps: 15, weight: 40.0, rest: 60 },
        ],
    });

 
    await prisma.user.create({
        data: {
            email: 'jan.kowalski@example.com',
            name: 'Jan Kowalski',
            password: 'test123',
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

    console.log(' Seed completed.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
