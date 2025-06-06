export const ORGANISATIONAL_SIZE = {
  DELAYS_PER_PROJECT: {
    10: 1,
    15: 1,
    25: 2,
    50: 3,
    100: 3,
    200: 4,
    300: 4,
    400: 4,
    500: 4,
    600: 5,
    800: 5,
    1000: 6,
    1200: 7,
    1400: 7,
    //1500: 8,
    1600: 8,
    1800: 8,
    2000: 9,
    2250: 9,
    2500: 10,
    2750: 10,
    3000: 10,
    3250: 10,
    3500: 10,
    3750: 11,
    4000: 11,
    4250: 11,
    4500: 11,
    4750: 11,
    5000: 11,
    5500: 12,
    6000: 12,
    6500: 13,
    7000: 13,
    7500: 13,
    8000: 14,
    8500: 14,
    9000: 14,
    9500: 14,
    10000: 15,
    11000: 15,
    12000: 16,
    13000: 16,
    14000: 17,
    15000: 17,
    16000: 17,
    17000: 18,
    18000: 18,
    19000: 18,
    20000: 18,
    21000: 19,
    22000: 19,
    23000: 19,
    24000: 19,
    25000: 19,
    26000: 20,
    27000: 20,
    28000: 20,
    29000: 20,
    30000: 20,
    31000: 20,
    32000: 21,
    33000: 21,
    34000: 21,
    35000: 21,
    36000: 21,
    37000: 21,
    38000: 21,
    39000: 22,
    40000: 22,
    41000: 22,
    42000: 22,
    43000: 22,
    44000: 22,
    45000: 22,
    46000: 22,
    47000: 22,
    48000: 22,
    49000: 22,
    50000: 22,
    1000000: 22,
  },
  TEAMS_IMPACTED: {
    10: 1,
    15: 1,
    25: 1,
    50: 1,
    100: 2,
    200: 2,
    300: 2,
    400: 2,
    500: 2,
    600: 3,
    800: 3,
    1000: 3,
    1200: 3,
    1400: 3,
    //1500: 4,
    1600: 4,
    1800: 4,
    2000: 5,
    2250: 5,
    2500: 6,
    2750: 6,
    3000: 6,
    3250: 6,
    3500: 6,
    3750: 7,
    4000: 7,
    4250: 7,
    4500: 7,
    4750: 7,
    5000: 7,
    5500: 8,
    6000: 8,
    6500: 9,
    7000: 9,
    7500: 9,
    8000: 9,
    8500: 9,
    9000: 9,
    9500: 9,
    10000: 10,
    11000: 10,
    12000: 10,
    13000: 10,
    14000: 10,
    15000: 10,
    16000: 10,
    17000: 10,
    18000: 10,
    19000: 10,
    20000: 10,
    21000: 10,
    22000: 10,
    23000: 10,
    24000: 10,
    25000: 10,
    26000: 10,
    27000: 10,
    28000: 10,
    29000: 10,
    30000: 10,
    31000: 10,
    32000: 10,
    33000: 10,
    34000: 10,
    35000: 10,
    36000: 10,
    37000: 10,
    38000: 10,
    39000: 10,
    40000: 10,
    41000: 10,
    42000: 10,
    43000: 10,
    44000: 10,
    45000: 10,
    46000: 10,
    47000: 10,
    48000: 10,
    49000: 10,
    50000: 10,
    1000000: 10,
  },

  DELAY_DURATION: {
    10: 1,
    15: 1,
    25: 1,
    50: 2,
    100: 2,
    200: 2,
    300: 3,
    400: 3,
    500: 2,
    600: 3,
    800: 4,
    1000: 4,
    1200: 4,
    1400: 5,
    1500: 5,
    1600: 6,
    1800: 6,
    2000: 7,
    2250: 7,
    2500: 8,
    2750: 8,
    3000: 8,
    3250: 8,
    3500: 8,
    3750: 9,
    4000: 9,
    4250: 9,
    4500: 9,
    4750: 9,
    5000: 9,
    5500: 10,
    6000: 10,
    6500: 10,
    7000: 11,
    7500: 11,
    8000: 11,
    8500: 12,
    9000: 12,
    9500: 12,
    10000: 13,
    11000: 13,
    12000: 13,
    13000: 13,
    14000: 13,
    15000: 13,
    16000: 13,
    17000: 13,
    18000: 13,
    19000: 13,
    20000: 13,
    21000: 13,
    22000: 13,
    23000: 13,
    24000: 13,
    25000: 13,
    26000: 13,
    27000: 13,
    28000: 13,
    29000: 13,
    30000: 13,
    31000: 13,
    32000: 13,
    33000: 13,
    34000: 13,
    35000: 13,
    36000: 13,
    37000: 13,
    38000: 13,
    39000: 13,
    40000: 13,
    41000: 13,
    42000: 13,
    43000: 13,
    44000: 13,
    45000: 13,
    46000: 13,
    47000: 13,
    48000: 13,
    49000: 13,
    50000: 13,
    1000000: 13
  }
}

export type EmployeeNumber = keyof (typeof ORGANISATIONAL_SIZE)['DELAYS_PER_PROJECT']