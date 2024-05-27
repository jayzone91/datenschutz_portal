import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  find: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        isAdmin: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          isAdmin: input.isAdmin ?? false,
        },
      });
    }),

  //   create: protectedProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       // simulate a slow db call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       return ctx.db.post.create({
  //         data: {
  //           name: input.name,
  //           createdBy: { connect: { id: ctx.session.user.id } },
  //         },
  //       });
  //     }),
});
