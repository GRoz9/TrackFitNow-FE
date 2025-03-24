# ProfileSetup Info Needed:

- Age [X]
- Height [X]
- Weight [X]
- Gender [X]
- Activity Level [X]
- Fitness Goal [X]
- Info for Calculations:
- - BMI (Weight(Kg) X Meters^2)
- - Protein (0.8 X Weight(Kg))
- - Ideal Weight - D. R. Miller Formula (1983):
    - Male: 56.2 kg + 1.41 kg per inch over 5 feet
    - Female: 53.1 kg + 1.36 kg per inch over 5 feet

- - Body fat percentage (BMI Method):

    - Body fat percentage (BFP) formula for adult males:  
      BFP = 1.20 × BMI + 0.23 × Age - 16.2

    - Body fat percentage (BFP) formula for adult females:  
      BFP = 1.20 × BMI + 0.23 × Age - 5.4

    - Body fat percentage (BFP) formula for boys:  
      FP = 1.51 × BMI - 0.70 × Age - 2.2

    - Body fat percentage (BFP) formula for girls:  
      BFP = 1.51 × BMI - 0.70 × Age + 1.4

- - Basal Metabolic Rate(BMR) Mifflin-St Jeor Equation:
    - List of activity options: Sedentary, Light, Moderate, Active & Very Active
    - For men: BMR = 10W + 6.25H - 5A + 5
    - For women: BMR = 10W + 6.25H - 5A - 161

## Extra Info

- Protein:

  How much protein do I need?
  The amount of protein that the human body requires daily is dependent on many conditions, including overall energy intake, growth of the individual, and physical activity level. It is often estimated based on body weight, as a percentage of total caloric intake (10-35%), or based on age alone. 0.8g/kg of body weight is a commonly cited recommended dietary allowance (RDA). This value is the minimum recommended value to maintain basic nutritional requirements, but consuming more protein, up to a certain point, maybe beneficial, depending on the sources of the protein.

  The recommended range of protein intake is between 0.8 g/kg and 1.8 g/kg of body weight, dependent on the many factors listed above. People who are highly active, or who wish to build more muscle should generally consume more protein. Some sources suggest consuming between 1.8 to 2 g/kg for those who are highly active. The amount of protein a person should consume, to date, is not an exact science, and each individual should consult a specialist, be it a dietitian, doctor, or personal trainer, to help determine their individual needs.

- BMR:

  This value is multiplied by an activity factor (generally 1.2-1.95) dependent on a person's typical levels of exercise

# Possible future changes

- Use cookies instead of localStorage & sessionStorage [X]
- Store the Jwt Token in the database and use the stored token in the cookie to fetch users data [-] -> Used an api to call it each time when the website is refreshed, using the token to get the data
