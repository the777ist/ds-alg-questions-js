/*
#easy

An integer M and a non-empty array A consisting of N non-negative integers are given. All integers in array A are less than or equal to M.

A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The slice consists of the elements A[P], A[P + 1], ..., A[Q]. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

For example, consider integer M = 6 and array A such that:
    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 5
    A[4] = 2

There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

The goal is to calculate the number of distinct slices.

Write a function:

function solution(M, A);

that, given an integer M and a non-empty array A consisting of N integers, returns the number of distinct slices.

If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

For example, given integer M = 6 and array A such that:
    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 5
    A[4] = 2
    
the function should return 9, as explained above.
*/

/* CATERPILLAR METHOD */
function caterpillarMethod(A, S) {
  let front = 0, back = 0, total = 0;

  for (let i = 0; i < A.length; i++) {
    // we start both "back" and "first" at the first index
    back = i;

    // keep looking ahead, and adding A[front] to "total"
    // as long as total + A[front] is lesser than S, keep incrementing front and doing the same
    while (front < A.length && total + A[front] <= S) {
      total += A[front]
      front += 1;
    }

    // check if we've reached the sum
    if (total === S) return true;

    // since while loop was exited, it means that the value of "total" crossed S
    // so subtract A[back] from the total and increment back with the next iteration of the for loop
    total -= A[back];
  }

  return false;
}

caterpillarMethod([6, 2, 7, 4, 1, 3, 6], 12);

/* CORRECT BUT INEFFICIENT SOLUTION */
/* 100% accuracy, 40% performance */
function countDistinctSlices(M, A) {
  let res = 0;
  let visited = {};

  let front = 0, back = 0;

  for (let i = 0; i < A.length; i++) {
    back = i;
    front = i;
    visited = {};

    while (front < A.length && !visited[A[front]]) {
      visited[A[front]] = true;
      front += 1;
      res += 1;

      if (res > 1000000000) return 1000000000;
    }
  }

  return res;
}

countDistinctSlices(6, [3, 4, 5, 5, 2]);

/* CORRECT AND EFFICIENT SOLUTION */
/* HINT:
the formula: 1 + 2 + 3 + 4 + ... + (n - 1) + n = (n * (n + 1)) / 2
*/