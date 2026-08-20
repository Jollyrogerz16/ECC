---
name: music-arrangement
description: Arrangement and contrast for AI songs so verse, pre, chorus, and bridge do different jobs. Covers density maps, signature sounds, subtractive arrangement, and energy over the 8-bar grid. Use when a Suno track is a wall of sound, the chorus does not lift, or every section feels like the same loop.
origin: ECC
---

# Music Arrangement

AI generations default to "all the instruments, all the time." Arrangement is what you mute, when the hook arrives, and which eight bars the listener could identify with the vocal off.

This is not mix faders (`music-mix-master`) and not lyric scan (`lyric-craft`). This is section jobs.

## When to Activate

- Verse and chorus are the same density
- The song feels long at 2:10 or unfinished at 3:40
- No signature sound in the first 8 bars
- User says "arrangement", "it doesn't lift", "wall of sound", "needs a bridge", "too much going on"
- Planning the grid before Custom Mode, or diagnosing a keeper that still bores

`music-producer` owns the session. `a-and-r-reviewer` fails the song if this skill's contrast tests fail.

## Core Rules

1. **Every section has a job.** If you cannot say the job in one clause, the section is a loop with a new label.
2. **Contrast is subtractive first.** Mute before you add a new synth.
3. **The chorus earns a rest.** A wall-to-wall chorus is a verse with extra reverb.
4. **Signature sound by bar 8.** One identifiable thing: a guitar figure, a vocal fragment, a drum motif. Not "the whole mix."
5. **Streaming singles usually live at 2:30–3:30.** After 3:45 you need a reason.

## Density map

Score each section 1–10 for *count of independent parts*, not loudness.

| Section | Typical density | What changes vs the last section |
|---|---|---|
| Intro | 2–4 | Signature sound, no full vocal |
| Verse 1 | 3–5 | Space, dry lead, fewer hats |
| Pre | 5–6 | New rhythm or harmony; not the title yet |
| Chorus | 6–8 | Hook + one extra layer + air |
| Verse 2 | 4–6 | New lyric info, a small extra (ad-lib, guitar answer) |
| Chorus 2 | 7–8 | Stack or percussion the first chorus did not have |
| Bridge | 2–5 | Strip, half-time, new chord, or spoken |
| Final | 8–9 | Peak, then stop. Do not keep stacking forever |
| Outro | 2–4 | Fragment of the signature sound |

If verse and chorus are both 8, regenerate simpler or arrange in the DAW by muting stems. Prompt density is often a `suno-prompting` problem — exclude `full band, wall of sound, layered symphony`.

## 8-bar jobs (write this before generating)

```text
INTRO   [  ] bars  — signature:
VERSE1  [  ] bars  — story beat:
PRE     [  ] bars  — lift mechanism (harmony / rhythm / filter):
CHORUS  [  ] bars  — title placement:
VERSE2  [  ] bars  — new information:
BRIDGE  [  ] bars  — contrast type:
FINAL   [  ] bars  — what is actually new:
OUTRO   [  ] bars  — how it ends (hard stop / delay / fade):
```

Hard stops beat 20-second fades on streaming.

## Contrast types (pick one per bridge)

- **Strip:** voice + one instrument
- **Rhythm:** half-time, or hats out
- **Harmony:** new chord or relative major/minor; do not modulate unless you can land it
- **Vocal:** whisper, spoken, or unison shout — not a fourth chorus
- **Register:** bass out, or bass only

If the bridge restates the chorus with fancier words, delete it (`lyric-craft`).

## DAW arrangement on AI stems

You can arrange a dense generation without another 20 takes:

- Mute pads in verses
- High-pass or drop the second guitar until chorus
- Delay the first crash until the chorus downbeat
- Filter the hook instrument in the pre, open it on the title
- Cut the last bar of the pre (stop) so the chorus hits

If muting reveals there is no hook, you do not have an arrangement problem. You have a song problem. Send back to `lyricist` / `suno-prompting`.

## Signature sound

Name it in the brief: "muted guitar chank", "vocal 'red light' fragment", "rounded 808 pickup."

Place it:

- Intro: exposed
- Verse: reduced or absent
- Chorus: in conversation with the vocal, not competing at 1 kHz
- Outro: leftover

A signature sound you cannot hum is a texture, not a signature.

## Anti-Patterns

- New instrument every 4 bars because the last section was boring (that is a hook problem)
- Pre-chorus that is a mini-chorus
- Bridge that is chorus 4
- Intro longer than 15 seconds on a streaming single unless the genre is that
- Asking the model for "more epic" to create contrast
- Copying a living artist's arrangement beat-for-beat

## Best Practices

- Print the density map and keep it next to the DAW
- A/B verse vs chorus with the vocal muted — they should still feel different
- Cut 8 bars before you add 8 bars
- Lock arrangement before you polish the mix; mix cannot invent a lift

## Related Skills

- `ai-music-production` — pipeline and A&R gate
- `suno-prompting` — simpler generations split and arrange cleaner
- `lyric-craft` — section jobs in the words
- `vocal-production` — stacks only where the map says chorus/final
- `music-mix-master` — automation after the mute decisions
- `taste` — picture cut to this grid once audio is locked
