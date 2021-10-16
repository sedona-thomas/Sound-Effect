# Sound-Effect
Recreating sounds in Web Audio

## Dial Tone, Ringing Telephone, Telephone Number Keys
  I began by building up from a single dial tone and then modified it to turn on and off. After finishing both the dial tone and ringer, I repurposed the dial tone strategy for a numeric keypad, following the steps in Designing Sound for making each of the number key frequencies.
  
## Meditation Bowl
  As I was messing with sounds trying to create a crackling fire and smooth out the sound, I accidentally combined an oscillator, lfo, and lowpass filter in a way that sounded like the metal bowls people use for meditation. This sound required an lfo controlled oscillator to both be passed in parallel through a gain node to control the adsr envelope and through a lowpass filter. I tried changing different combinations of the nodes and values, but the one that sounded the closest to the bowls was at an oscillator frequency of 650 with an lfo frequency of 300. I also modified the method that turns on and off the sound to finish the adsr envelope whenever someone turns the sound on and off.
  Instrument Example: https://www.youtube.com/watch?v=1KF3k1egkLI

## Additional Attempts
  I initially attempted to make a cartoon boing sound and really struggled so I began trying to make a crackling fire but I couldn't figure out how to get it to sound smoother. After finishing the babbling brook, I understand enough to create it but didn't have enough time to implement it.
