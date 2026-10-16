/* =====================================================================
   SITE CONTENT — edit this file to update the whole website.
   Everything below is plain JavaScript objects. No build step needed.
   ===================================================================== */

window.SITE = {
  name: "Trevor Sen",
  initials: "TS", // shown in the logo monogram and favicon
  role: "Electrical Engineering Student",
  location: "Merced, California",
  tagline:
    "My main focus is learning through doing and teaching afterward. My goal is to break into embedded systems and robotics.",
  email: "trevor.kai.sen@gmail.com",
  // Replace with your own photo (square, at least 600x600). JPG/PNG/WebP all work.
  headshot: "assets/img/headshot.jpg",
  resume: "", // e.g. "assets/Trevor-Cho-Resume.pdf" — leave empty to hide the button
  links: {
    linkedin: "https://www.linkedin.com/in/trevor-k-sen",
    github: "https://github.com/RCGames587",
    // Discord profile link format: https://discord.com/users/<your numeric user ID>
    discord: "https://discord.com/users/446450851297624065",
    discordHandle: "RCGames587",
  },
};

/* ---------------------------------------------------------------------
   PROJECTS
   status: "current" | "past"
   --------------------------------------------------------------------- */
window.PROJECTS = [
  {
    id: "rhythm-machine",
    title: "Rhythm Arcade Machine",
    status: "current",
    featured: true,
    date: "2026 — present",
    image: "assets/img/itgmania-logo.png",
    summary:
      "A linux-based arcade cabinet that runs ITGmania and other related rhythm games. Ornated with a custom built cabinet and a custom dance pad controller using Arduino Hardware",
    role: "Design, fabrication, firmware",
    stack: ["Arduino C++", "FSR sensors", "Linux", "Woodworking", "Controllers"],
    highlights: [
      "Created a custom UI for a seamless and digestible user experience ",
      "Modularity to add future games and controllers",
      "Designed for reuse of salvaged materials to keep costs low",
    ],
    links: [{ label: "Source", url: "https://github.com/RCGames587" }],
  },
  {
    id: "env-node",
    title: "Low-Power Environmental Sensor Node",
    status: "current",
    featured: true,
    date: "2026 — present",
    image: "assets/img/env-sensor.webp",
    summary:
      "An energy-efficient sensing node that logs temperature, humidity, and air quality, then reports to a Raspberry Pi dashboard.",
    role: "Hardware + embedded software",
    stack: ["Raspberry Pi", "I²C sensors", "Sleep modes", "Python"],
    highlights: [
      "Duty-cycled sampling to stretch battery life",
      "Calibrated sensor readings against a reference instrument",
      "Simple web dashboard for trends over time",
    ],
    links: [{ label: "Source", url: "https://github.com/your-handle" }],
  },
  {
    id: "nfc-secure",
    title: "NFC, RFID & Secure Elements",
    status: "past",
    featured: true,
    date: "2025",
    image: "assets/img/nfc.webp",
    summary:
      "A technical presentation and demo on how NFC tags, RFID readers, and secure elements authenticate data — from the physics of inductive coupling to the silicon.",
    role: "Research, presentation, live demo",
    stack: ["NFC / ISO 14443", "RFID", "Semiconductors", "Technical writing"],
    highlights: [
      "Explained inductive coupling and load modulation for a non-specialist audience",
      "Live read/write demo using an RC522 reader module",
      "Fully cited slide deck with primary sources",
    ],
    links: [],
  },
  {
    id: "godot-shmup",
    title: "Bullet-Hell Game Systems in Godot",
    status: "past",
    featured: false,
    date: "2025",
    image: "assets/img/game-dev.webp",
    summary:
      "A 2D bullet-hell prototype built around reusable enemy, projectile, and spawner systems driven by clean state logic.",
    role: "Gameplay programming",
    stack: ["Godot", "GDScript", "State machines"],
    highlights: [
      "Data-driven spawners for designing bullet patterns without new code",
      "Finite state machines for enemy behavior",
      "Object pooling to keep hundreds of projectiles smooth",
    ],
    links: [{ label: "Source", url: "https://github.com/your-handle" }],
  },
];

/* ---------------------------------------------------------------------
   TUTORIALS → WORKSHOPS
   Each tutorial moves through stages as you iterate on it:
     "prototype"      – it works for you
     "iterating"      – tested with a few people, being refined
     "workshop-ready" – timed, kitted, and ready to run for a group
   Add an entry to `iterations` every time you revise it.
   --------------------------------------------------------------------- */
window.TUTORIALS = [
  {
    id: "blink-to-pwm",
    title: "From Blink to PWM: Controlling Light with a Microcontroller",
    status: "workshop-ready",
    version: "v1.2",
    level: "Beginner",
    duration: "60 min",
    tags: ["Arduino", "GPIO", "PWM"],
    summary:
      "Start with the classic blinking LED and finish by fading it smoothly — learning digital outputs, current-limiting resistors, and pulse-width modulation along the way.",
    objectives: [
      "Calculate a current-limiting resistor using Ohm's law",
      "Configure a GPIO pin as a digital output",
      "Explain duty cycle and use analogWrite() to dim an LED",
    ],
    materials: [
      "Arduino Uno (or compatible)",
      "Breadboard + jumper wires",
      "1× 5 mm LED",
      "1× 220 Ω resistor",
      "USB cable",
    ],
    steps: [
      {
        title: "Size the resistor",
        body:
          "A red LED drops about 2 V and is happy at around 15 mA. With a 5 V pin, R = (5 V − 2 V) / 0.015 A ≈ 200 Ω. The nearest standard value, 220 Ω, keeps the LED safe.",
      },
      {
        title: "Wire the circuit",
        body:
          "Connect **pin 9** → 220 Ω resistor → LED anode (long leg). Connect the LED cathode (short leg, flat side) to `GND`.",
        // Optional rich content: mix text, images, callouts, code, lists, and tables.
        content: [
          { type: "image", src: "assets/img/workshop.webp", alt: "Workshop kits laid out on a lab bench", caption: "Each pair gets one pre-sorted kit. Swap in a photo of your actual breadboard here." },
          { type: "callout", tone: "warning", text: "An LED with no resistor will draw too much current and can damage the LED or the pin. Always put the resistor in series." },
          { type: "table", headers: ["Wire", "From", "To"], rows: [["1", "Pin 9", "220 Ω resistor"], ["2", "Resistor", "LED anode (+)"], ["3", "LED cathode (−)", "GND"]] },
        ],
      },
      {
        title: "Blink it",
        body: "Upload the sketch below and confirm the LED toggles once per second.",
        code: `const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  delay(500);
  digitalWrite(LED, LOW);
  delay(500);
}`,
      },
      {
        title: "Fade it with PWM",
        body:
          "Pin 9 supports PWM. analogWrite() takes 0–255, which sets the duty cycle: the fraction of each period the pin is HIGH. Your eye averages it into brightness.",
        code: `const int LED = 9;

void setup() { pinMode(LED, OUTPUT); }

void loop() {
  for (int d = 0; d <= 255; d++) { analogWrite(LED, d); delay(4); }
  for (int d = 255; d >= 0; d--) { analogWrite(LED, d); delay(4); }
}`,
      },
      {
        title: "Challenge",
        body:
          "Add a potentiometer on A0 and map its reading (0–1023) to brightness (0–255) with map(). Bonus: probe pin 9 with an oscilloscope and watch the duty cycle change.",
      },
    ],
    workshop: {
      audience: "First-year EE / CS students, no prior hardware experience",
      groupSize: "12–24 students, pairs",
      format: "10 min intro · 40 min guided build · 10 min challenge + wrap-up",
      facilitatorNotes: [
        "Pre-bend LED legs or mark the anode — polarity is the #1 issue.",
        "Have spare USB cables; some laptops need drivers for clone boards.",
        "Show a scope trace of PWM on the projector if one is available.",
      ],
    },
    iterations: [
      { version: "v1.2", date: "2026-09", notes: "Added potentiometer challenge and timing breakdown for a 60-minute session." },
      { version: "v1.1", date: "2026-08", notes: "Rewrote resistor step after test group struggled with LED forward voltage." },
      { version: "v1.0", date: "2026-07", notes: "First version, tested with 3 classmates." },
    ],
  },
  {
    id: "rc-transients",
    title: "Seeing RC Transients: Theory Meets the Oscilloscope",
    status: "iterating",
    version: "v0.3",
    level: "Intermediate",
    duration: "75 min",
    tags: ["Circuits", "Laplace", "Measurement"],
    summary:
      "Derive the step response of an RC circuit, predict the time constant, then measure it with a square-wave input and compare theory to reality.",
    objectives: [
      "Derive v(t) = V(1 − e^(−t/RC)) for a charging capacitor",
      "Use the Laplace transform to reach the same result",
      "Measure τ on an oscilloscope and explain the error sources",
    ],
    materials: [
      "Function generator (or a microcontroller square wave)",
      "Oscilloscope",
      "10 kΩ resistor, 10 µF capacitor",
      "Breadboard + leads",
    ],
    steps: [
      {
        title: "Predict",
        body:
          "With R = 10 kΩ and C = 10 µF, τ = RC = 0.1 s. After one τ the capacitor reaches ~63% of the step; after 5τ it is effectively fully charged.",
      },
      {
        title: "Derive in the s-domain",
        body:
          "Model the step as V/s. The capacitor voltage is Vc(s) = (V/s) · 1/(1 + sRC). Partial fractions give V/s − V/(s + 1/RC), which inverts to V(1 − e^(−t/RC)).",
      },
      {
        title: "Measure",
        body:
          "Drive the circuit with a 1 Hz square wave. Trigger on the rising edge and use cursors to find the time where the trace crosses 63% of the final value.",
      },
      {
        title: "Reflect",
        body:
          "Compare measured and predicted τ. Discuss component tolerance (capacitors are often ±20%) and the scope's input impedance.",
      },
    ],
    workshop: {
      audience: "Students currently taking Circuits I/II",
      groupSize: "8–16 students",
      format: "Draft — timing still being tested",
      facilitatorNotes: [
        "Need a fallback if the lab has limited function generators (Arduino square wave works).",
        "Consider a pre-lab worksheet for the Laplace derivation.",
      ],
    },
    iterations: [
      { version: "v0.3", date: "2026-09", notes: "Added s-domain derivation step alongside the time-domain one." },
      { version: "v0.2", date: "2026-08", notes: "Swapped to a 10 µF cap so τ is visible without fast timebases." },
      { version: "v0.1", date: "2026-06", notes: "Initial lab notes." },
    ],
  },
  {
    id: "i2c-sensor",
    title: "Reading an I²C Sensor from Scratch",
    status: "prototype",
    version: "v0.1",
    level: "Intermediate",
    duration: "45 min",
    tags: ["I²C", "Sensors", "Embedded"],
    summary:
      "Talk to a temperature/humidity sensor over I²C: scan the bus, read registers, and convert raw bytes into real units.",
    objectives: [
      "Explain SDA/SCL, addressing, and pull-up resistors",
      "Run an I²C bus scan to find a device",
      "Convert raw sensor bytes into °C and %RH using the datasheet",
    ],
    materials: ["Arduino or Raspberry Pi", "I²C temp/humidity breakout", "Jumper wires"],
    steps: [
      {
        title: "Scan the bus",
        body: "Wire SDA, SCL, VCC, and GND, then run a scanner to discover the sensor's 7-bit address.",
        code: `#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(115200);
  for (byte a = 1; a < 127; a++) {
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) {
      Serial.print("Found device at 0x");
      Serial.println(a, HEX);
    }
  }
}

void loop() {}`,
      },
      {
        title: "Read and convert",
        body: "Follow the datasheet's measurement command, read the returned bytes, and apply the conversion formula.",
      },
    ],
    workshop: {
      audience: "TBD",
      groupSize: "TBD",
      format: "Not yet timed",
      facilitatorNotes: ["Decide on one sensor model so every kit matches."],
    },
    iterations: [{ version: "v0.1", date: "2026-09", notes: "Working prototype on my bench." }],
  },
];

/* ---------------------------------------------------------------------
   INVOLVEMENTS — student organizations, clubs, and leadership
   status: "current" | "past"
   logo: optional image path; if empty, initials of the name are shown
   --------------------------------------------------------------------- */
window.INVOLVEMENTS = [
  {
    id: "robotics",
    name: "Robotics Society at UC Merced",
    short: "RS",
    status: "current",
    dates: "2026 — present",
    logo: "",
    summary:
      "Robotics Society is a multidisciplinary organization of all things robotics. We are project-based and boast both small scale workshops and large scale projects",
    roles: [
      { title: "Vice President", dates: "May 2026 — Present", notes: "Oversees club logistics, Plans and runs workshops, Supports projects as Electrical Consultant, Ensures club and project funding" },
      { title: "General Member", dates: "January 2025 — May 2026", notes: "Plan and run hands-on hardware workshops" },
    ],
    highlights: [
      "Ran an intro microcontroller workshop for first-year students",
      "Helped organize a chapter hardware build night",
    ],
    tags: ["Robotics", "Teaching", "Hardware"],
    link: "https://robotics-society-ucmerced.com/",
  },
  {
    id: "tennis",
    name: "UCM Club Tennis",
    short: "CT",
    status: "current",
    dates: "2024 — present",
    logo: "",
    summary: "A USTA club team that welcomes all skill levels, while also competing against nationally ranked clubs around North California",
    roles: [{ title: "Treasurer", dates: "2026 — present", notes: "Secures funding, budgets current allocations, heads fundraising efforts" }],
    highlights: ["Consistent team Captain"],
    tags: ["Athletics", "Teamwork", "Competition"],
    link: "",
  },

];
