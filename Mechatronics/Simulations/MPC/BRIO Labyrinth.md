---
title: Solving the BRIO Labyrinth using MPC with Convex QP formulation
description: This article covers solving the BRIO Labyrinth using MPC in simulation. 
layout: libdoc_page.liquid
permalink: Mechatronics/Simulations/MPC/BRIO Labyrinth/index.html
tags:
    - Control Systems
    - Project
    - Practice
    - BRIO Labyrinth
    - MPC
    - Convex QP
date: 2026-01-11
---

> **Note**: This article is a work in progress but the implementation is fully complete. In the mean time, interested readers, please checkout the source code [here](https://github.com/patchedByBatman/MPC-Brio-Labyrinth)

## Some context

I recently came across a paper titled <em>Adaptive Nonlinear Model Predictive Control for a Real-World Labyrinth Game</em> [1], in which the authors showcased a two-level MPC architecture for solving the BRIO Labyrinth. The architecture uses a high-level MPC to generates optimal trajectories for the low-level MPC, which then controls the platform to make the ball follow the computed trajectory.

In the paper, the high-level controller takes into account all the wall and hole constraints for computing the optimal trajectory. These constraints make the navigation space non-convex, and because the dynamics of the system are non-linear, finding solutions for the formulated non-linear non-convex optimal control problem is computationally heavy.

<b>Note:</b> One interesting point to note from the paper [1] is that, the authors used Superellipses to approximate the boundaries of each wall. Such constraints help combine multiple constraints (rectangular constraint for a wall involves 4 constraints) in to one, are easy to design, and have simple implementation.

In this project, to avoid computational complexity, instead of using a two-level controller architecture and taking non-convex constraints, I intend to compute a local feasible convex set around the ball's current position at every instant and use this as the constraint set.

The goal at each iteration would be to make the ball reach a target position with-in the computed convex set, set on the solution path towards the goal. The Idea is to combine this with linearised dynamics, which would yield a convex optimisation problem, which could be solved efficiently.

The solution path is a set of chords each aligning with one of the cardinal directions, when combined form a single path connecting the start and finish positions. This means that the solution path does not have any curves and can be computed using simple path search algorithms. For the sake of simplicity, the solution path is predetermined and set in to the program. It is worth noting that the solution path is independent of the dynamics of the system, eliminating the need for heavy computation. 

This solution path is then sampled into a collection of points at a constant sampling rate in space (samples-per-meter). The idea is to use an MPC formulated using convex constraints, to chase after a time-varying position reference that moves on this sampled solution path from start to finish. 

We approach the project's development in 2 stages.

To develop an initial framework to compute the convex sets as the ball navigates through the labyrinth.
To formulate the MPC and solve the labyrinth.

<b>Note:</b> The article and the author (me) have no affiliations with the company BRIO, and in no way or form trying to advertise their products.


## Convex set construction:

For construction the rectangular convex sets, we employ a simple ray-tracing algorithm. The algorithm is as follows:

1. From the center of the steel ball, project r radially-equally spaced rays in all directions.
2. For each ray compute intersections 
    1. with each obstacle per side and
        1. Select the intersection that is closest to the centre of the ball and lies on the corresponding object's surface.
    2. Divide all selected intersections into left, bottom, right, and top intersections.
    3. Select the closest intersection to the ball in each of the left, bottom, right, and top divisions. Add them to their corresponding list.
3. Select the closest intersections to the ball in each of the left, bottom, right, and top division lists.
4. Divide the closest intersections into left, bottom, right and top boundaries based on which face of the object the intersection point lies on. With logic as follows:
    1. If the intersection point lies on the left surface of the corresponding object:
        1. Then the intersection point is on the right side of the ball and goes into the right boundaries collection.
    1. Else if the intersection point lies on the bottom surface of the corresponding object:
        1. Then the intersection point is on the top side of the ball and goes into the top boundaries collection.
    1. Else if the intersection point lies on the right surface of the object:
        1. Then the intersection point is on the left side of the ball and goes into the left boundaries collection.
    1. Else if the intersection point lies on the top surface of the object:
        1. Then the intersection point is on the bottom side of the ball and goes into bottom boundaries collection.
5. Select one intersection from each collection made in step 4, and construct rectangles for all possible collections.
6. Select the four intersections that produce a rectangle with maximum area and contains the steel ball. This is our convex set. Let us call this feasible convex set.

## MPC formulation

With the computed feasible convex set as $Z$, we define the following optimization problem,

$$
\begin{align*}
 \mathbb{P}(x):& \ \underset{\boldsymbol{u}_N}{\text{minimise}}\  \sum_{t = 0}^{N-1} \left((z_t - z^\text{ref})^\intercal Q (z_t - z^\text{ref}) + u_t^\intercal R u_t\right) + (z_N - z^\text{ref})^\intercal Q (z_N - z^\text{ref}) \\
 \text{s.t}:&\ (z_t^1, z_t^3) \in Z, \forall t \in [0, N], \\
  &\ (z_t^2, z_t^4, z_t^5, z_t^6) \in V, \forall t \in [0, N], \\
  &\ z^\text{ref} \in Z, \\
  &\ z_{t+1} = Az_t + Bu_t, \forall t \in [0, N - 1], \\
  &\ x = x_0,
\end{align*}
$$


## References

[1]: Adaptive Nonlinear Model Predictive Control for a Real-World Labyrinth Game by Johannes Gaber et\.al.
