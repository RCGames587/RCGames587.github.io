/* =====================================================================
   SITE CONTENT — edit this file to update the whole website.
   Everything below is plain JavaScript objects. No build step needed.
   ===================================================================== */

window.SITE = {
  name: "Trevor Cho",
  initials: "TS", // shown in the logo monogram and favicon
  role: "Electrical Engineering Student",
  location: "Fresno, California",
  tagline:
    "I design embedded systems, build hardware that people can touch, and turn what I learn into workshops for other engineering students.",
  email: "rcgames15523@gmail.com",
  // Replace with your own photo (square, at least 600x600). JPG/PNG/WebP all work.
  headshot: "assets/img/headshot.svg",
  resume: "", // e.g. "assets/Trevor-Cho-Resume.pdf" — leave empty to hide the button
  links: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    // Discord profile link format: https://discord.com/users/<your numeric user ID>
    discord: "https://discord.com/users/000000000000000000",
    discordHandle: "your_handle",
  },
};

/* ---------------------------------------------------------------------
   PROJECTS
   status: "current" | "past"
   --------------------------------------------------------------------- */
window.PROJECTS = [
  {
    id: "dance-pad",
    title: "Arcade Rhythm Dance Pad",
    status: "current",
    featured: true,
    date: "2026 — present",
    image: "assets/img/dance-pad.webp",
    summary:
      "A full-size, four-panel dance pad for StepMania built from wood, force-sensitive resistors, and a microcontroller that enumerates as a USB game controller.",
    role: "Design, fabrication, firmware",
    stack: ["Arduino C++", "FSR sensors", "USB HID", "Woodworking"],
    highlights: [
      "Per-panel sensitivity thresholds tuned over serial for consistent step detection",
      "Debounced input pipeline for low-latency, fair gameplay",
      "Designed for reuse of salvaged materials to keep costs low",
    ],
    links: [{ label: "Source", url: "https://github.com/your-handle" }],
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
    id: "ieee",
    name: "IEEE Student Branch",
    short: "IEEE",
    status: "current",
    dates: "2025 — present",
    logo: "",
    summary:
      "The university chapter of the Institute of Electrical and Electronics Engineers, which runs technical workshops, industry talks, and design competitions.",
    roles: [
      { title: "Workshop Lead", dates: "2026 — present", notes: "Plan and run hands-on hardware workshops, many of which are on the [Tutorials](tutorials.html) page." },
      { title: "General Member", dates: "2025 — 2026" },
    ],
    highlights: [
      "Ran an intro microcontroller workshop for first-year students",
      "Helped organize a chapter hardware build night",
    ],
    tags: ["Leadership", "Teaching", "Hardware"],
    link: "https://www.ieee.org/membership/students",
  },
  {
    id: "robotics",
    name: "Robotics & Embedded Systems Club",
    short: "RES",
    status: "current",
    dates: "2025 — present",
    logo: "",
    summary: "A project-based club that builds robots and embedded systems for campus showcases and competitions.",
    roles: [{ title: "Electrical Subteam Member", dates: "2025 — present", notes: "Sensor integration, wiring harnesses, and motor driver testing." }],
    highlights: ["Designed a sensor wiring harness for the club's competition robot"],
    tags: ["Embedded", "Teamwork", "Competition"],
    link: "",
  },
  {
    id: "game-dev",
    name: "Game Development Club",
    short: "GDC",
    status: "past",
    dates: "2024 — 2025",
    logo: "",
    summary: "Student game jams and collaborative projects using Godot and other engines.",
    roles: [{ title: "Member", dates: "2024 — 2025" }],
    highlights: ["Built gameplay systems for two game-jam entries in Godot"],
    tags: ["Godot", "Programming", "Collaboration"],
    link: "",
  },
];
