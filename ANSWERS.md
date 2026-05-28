# ANSWERS.md — TIPxSPLIT Assessment

## 1. How to Run

No installations or build steps needed at all.

- Download or clone the repository
- Open `index.html` directly in any browser

Just make sure `index.html`, `style.css`, and `script.js` are all in the same folder and you're good to go.

## 2. Stack & Design Choices

**Why this stack:**

I went with plain HTML, CSS, and JavaScript because that's what I'm comfortable with right now — I'm in my second semester and HTML/CSS is where my foundation is. I hadn't touched JavaScript in a real project before this, so I used AI as a learning tool to understand how JS works and implement the logic. I made sure to read through every part of the code so I actually understood what was happening before using it. Going with vanilla JS also meant no frameworks, no installs, nothing to build — just open and run.

**Two decisions I made:**

- **Single column layout** — I went with this because honestly, most people use a bill splitter on their phone right after a meal. A single column just works naturally on mobile without needing to write a whole separate layout for it. It also looks clean on desktop without feeling stretched. One layout, works everywhere — easier for the user and easier for me.

- **Amber/gold color** — I picked amber because it reminded me of a coin, which felt right for an app about tipping and splitting money. It also pops really nicely against the dark background and makes the important parts like the active tip button and the per person amount stand out without being too loud.

## 3. Responsive & Accessibility

**How it behaves on different screen sizes:**

- On a 360px phone the card padding shrinks, the custom tip input drops to full width below the three preset buttons, and the per person text scales down a bit so nothing gets cut off or overflows
- On a 1440px laptop the card stays centered at a max width of 480px — it doesn't stretch across the whole screen which keeps it easy to read and focused
- Since it's single column the experience feels pretty much the same on both, just more breathing room on bigger screens

**One accessibility thing I handled:**

Every input has a `<label>` tag properly linked to it by ID so browsers and screen readers know exactly what each field is for. Error messages also show up right below whichever field caused the problem instead of a popup, so you immediately know what to fix. The theme toggle also has an `aria-label` on it.

**One thing I skipped:**

I didn't add live screen reader announcements for the result values. So if someone is using a screen reader, the updated numbers won't be read out automatically as they type. This would need `aria-live` regions on the result elements. I ran out of time to implement it properly but it's something I'd fix if I had more time.

## 4. AI Usage

**Tools I used:** Claude and Gemini

**What I used them for:**

My background before this was only HTML and CSS — no JavaScript. I used AI mainly to learn how JS works in a real project, things like listening for input events, validating fields live, running calculations on every keystroke, and updating the page without refreshing. I didn't just copy paste though — I read through everything and made sure I understood it before using it.

**Something I changed from what AI suggested:**

The AI originally gave me a plain button for the dark/light mode toggle with a basic click event. I changed it to a CSS pill toggle switch with a sliding thumb because a button just felt too generic. The toggle switch looks way cleaner and immediately tells you whether dark mode is on or off just by its position. Outside of that I personally chose the amber color scheme, the name TIPxSPLIT, the dark mode as default, the 🪙 coin emoji, which currencies to include, and all the emoji labels in the app. The single column layout was also my call after learning about mobile first design.

## 5. Honest Gap

The biggest thing missing is that the app only does equal splits. Real life isn't always like that — sometimes one person orders more, or someone wants to cover a bigger share. I'd also want to add VAT and service charge fields since a lot of restaurant bills already include those and right now you have to manually factor them into the bill amount yourself.

If I had one more day I'd build an unequal split mode where you can enter what each person owes individually, the app tracks what's been assigned vs what's left, and splits the tip proportionally based on each person's share. I'd also add a VAT toggle with a preset rate so the app calculates the tax inclusive total before applying the tip — that would make it actually useful for real restaurant situations instead of just simple equal splits.
