---
name: suno-prompting
description: Suno Custom Mode craft for style prompts, structure tags, Cover/Extend/Replace, personas, and take selection. Use when writing Suno prompts, fixing generic AI songs, or iterating v4.5/v5 generations before stem export.
---

# Suno Prompting

Custom Mode is the instrument. Simple Mode is a sketchpad. This skill is how you drive the style field, the lyrics field, and the iteration tools so the take is usable in a DAW.

For the full producer pipeline, use `ai-music-production`. For the words, use `lyric-craft`.

## When to Activate

- User is writing or debugging a Suno style prompt
- Generations sound generic, samey, or "AI"
- User mentions Custom Mode, Cover, Extend, Replace, Personas, weirdness, or style influence
- Translating a reference track into production language without naming a living artist
- Choosing between Simple Mode exploration and a serious Custom Mode pass

## Core Rules

1. **Genre first, then BPM, then vocal, then production.** Suno weights the start of the style field.
2. **Four to eight descriptors.** Each one must control a different axis. Repeating "dark atmospheric moody" is one idea, three times.
3. **Do not name living artists.** Describe the record, not the person. Dead-era language ("60s girl-group reverb") is production language. "Make it sound like [living star]" is a clone request — refuse it.
4. **Lyrics field owns structure.** Style does not. Put `[Verse]` / `[Chorus]` tags in lyrics, not in the style soup.
5. **One change per regeneration.** If you change genre, vocal, and BPM at once, you cannot learn what worked.

## Custom Mode Fields

| Field | Job | Anti-job |
|---|---|---|
| Style | Genre, BPM, vocal character, instrumentation, era, mix | Story, lyrics, "make it epic" |
| Lyrics | Words + section tags + delivery hints | Style adjectives |
| Title | Memory and metadata | A second prompt |
| Exclude / negative style | Remove known failure modes | Dumping the entire genre thesaurus |

### Style template

```text
[primary genre], [subgenre], [BPM] BPM, [time signature],
[vocal: range + texture + delivery],
[core instruments],
[groove / drum character],
[space: dry / room / plate / hall],
[mix era: modern streaming / 70s analog / dusty sampler]
```

Copy this shape, then delete anything you cannot hear in your head.

**Good**

```text
alt-R&B, late-night, 92 BPM, 4/4, intimate male falsetto with chest-voice cracks,
muted clean guitar, rounded 808, dry verse vocal, wide stacked chorus,
subtle vinyl noise, modern streaming mix, spacious but not cinematic
```

**Bad**

```text
An epic emotional cinematic masterpiece about heartbreak, sounding like The Weeknd
meets Billie Eilish, stunning vocals, chart-topping, 8k, masterpiece
```

### Exclude field

Put failure modes here, not extra genre wishes:

```text
EDM drop, chiptune, opera, choir, dubstep bass, lo-fi hop, spoken word, children's choir
```

If the model keeps adding a gospel choir you did not ask for, exclude `choir, gospel, stacked ahhs` rather than restating "intimate vocal" six times.

## Structure Tags (lyrics field)

Suno reads square-bracket tags as arrangement, not as sung text.

Use:

`[Intro]` `[Verse]` `[Pre-Chorus]` `[Chorus]` `[Bridge]` `[Instrumental]` `[Solo]` `[Outro]` `[Fade Out]`

Modifiers that help:

`[Soft Verse]` `[Building Pre-Chorus]` `[Final Chorus]` `[Whispered Bridge]` `[Dry Vocal]` `[Stacked Harmonies]` `[Half-time]` `[Break]` `[End]`

Put a delivery hint on its own line, then the sung lines:

```text
[Chorus]
[Stacked Harmonies]
We don't stay past the red light
We don't say what we mean
```

Do not write a novel in the tags. `[Cinematic Emotional Exploding Galaxy Chorus]` is noise.

Full lyric craft lives in `lyric-craft`. Keep 6–10 syllables on a sung line unless the groove is explicitly rapid-fire.

## Iteration Tools

| Tool | Use when | Do not use when |
|---|---|---|
| **Regenerate** | The take is not even close | You already have a keeper section |
| **Extend** | The chorus is real and you need a bridge or outro | The hook is missing — length will not invent it |
| **Cover** | The bones are right; vocal, groove, or genre needs a recast | You are hoping a Cover will write a better topline |
| **Replace / in-paint** | One section is the problem | The whole song is the problem |
| **Personas** | You want the same singer across a project | You have not locked a vocal you actually like |
| **Upload / audio prompt** | You have a hummed melody, a drum loop, or a verse you recorded | You are feeding another artist's master to clone it |

Always lock **Manual BPM** in Suno Studio before stem export. Cover and Extend can drift. See `ai-music-production`.

## Take Selection

Generate in batches of four. Score each take in one listen:

1. Does a chorus exist as a chorus?
2. Are words intelligible on a phone speaker?
3. Does the groove stay in one tempo neighborhood?
4. Is there a signature sound in the first 8 bars?

Keep sections, not songs. A verse from take 2 and a chorus from take 7 is a normal professional outcome. Cover the stitched idea if you need one continuous vocal.

## Translating References

You may *listen* to a reference. You may not *name* a living artist in the prompt.

| You heard | You write |
|---|---|
| Tight dry 70s drum kit, short room | dry close-mic drums, short room, 70s analog |
| Whispered verse, huge breathy chorus | intimate dry verse vocal, wide airy stacked chorus |
| Swing-eighth R&B at ~90 | 92 BPM, swung hats, lazy snare |
| Bright modern radio vocal | present lead vocal, de-essed, modern streaming vocal chain |
| Dusty chord loop, not a full band | sparse keys loop, sampled texture, lots of space |

If the user asks to clone a living artist, refuse and offer the translation table instead.

## Other Generators

Use the same brief. Swap the field names.

- **Udio:** Strong when you want stranger vowels and less "Suno sheen." Still Custom-style lyrics + tags. Still stems in a DAW.
- **Stable Audio-class / fal.ai:** Instrumental beds, trailers, loops. Not your vocal-single path. See `fal-ai-media`.
- **Suno Simple Mode:** Mood boards and accidents only. Promote a lucky accident into Custom Mode immediately.

## Worked Style Bank

Keep these as starting points, then cut:

```text
hyperpop, 140 BPM, 4/4, glossy nasal lead, metallic synth stabs,
distorted 808, clipped transients, neon, short room, aggressive bright mix
```

```text
organic indie folk, 118 BPM, 4/4, close female chest voice,
fingerpicked acoustic, brushed snare, upright bass, kitchen-room mics,
no pads, no choir
```

```text
dark synthwave, 100 BPM, 4/4, spoken-sung baritone,
analog bass sequence, gated snare, chorus guitar, analog tape,
night-drive, not cinematic orchestra
```

More genre axes live in `references/style-vocab.md` when the brief is stuck.

## Anti-Patterns

- Simple Mode for a release candidate
- Style field as a paragraph of plot
- Living-artist names, "in the style of X"
- Twenty comma-separated near-synonyms
- Structure tags in the style field
- Extending a chorus that does not exist
- Changing five variables and calling it an A/B test
- Shipping the generator's MP3 without stems
- Asking the model for "unique" or "original" — specify the sound

## Best Practices

- Read the style line out loud. If you cannot hear it, the model cannot either
- Keep a prompt log: style, seed/take number, what you kept
- When a take is 80% right, Cover it. Do not start a new universe
- Exclude the last failure, do not add more wishes
- Stop prompting when the A&R gate in `ai-music-production` passes

## Related Skills

- `ai-music-production` — full pipeline, Studio, stems, release
- `lyric-craft` — singable lyrics and tag blocks
- `music-mix-master` — what happens after export
- `fal-ai-media` — non-Suno beds and SFX
- `brand-voice` — artist persona across a body of work
- `taste` — visuals after the audio is locked
