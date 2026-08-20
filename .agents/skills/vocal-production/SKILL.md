---
name: vocal-production
description: Produce AI and hybrid vocals so they sound like a person, not a vowel costume. Covers comps, doubles, ad-libs, tuning, breaths, de-essing, stack width, and when to replace a Suno/Udio lead. Use when vocals slur, sit on top of the mix, lack consonants, or are the reason a track still sounds AI.
---

# Vocal Production

Generated leads often arrive already loud, already wet, and already smiling. Professional vocal production is consonants, breaths, a comp of the best phrases, and stacks that support the lead instead of burying it.

Lyrics that do not scan belong in `lyric-craft`. Mix bus and loudness belong in `music-mix-master`. This skill is the vocal session.

## When to Activate

- AI vocals slur, rush, or lose consonants on a phone speaker
- The lead sounds like a costume: even vowels, no breaths, no cracks
- Building doubles, harmonies, ad-libs, or a whispered verse
- Replacing a Suno/Udio lead with a Cover, a second generation, or a human take
- User says "tune this", "stack the chorus", "ad-libs", "the vocal sounds fake"

Delegate the lyric rewrite to `lyricist`. Delegate session strategy to `music-producer`. Delegate skip-tests to `a-and-r-reviewer`.

## Core Rules

1. **The lead is one person.** Stacks are quieter, thinner, and high-passed harder than the lead.
2. **Comp phrases, not songs.** Keep the best two bars of take 4 and the last word of take 9.
3. **Consonants and breaths are the anti-AI tell.** If you cannot hear `t`, `k`, `p`, `s`, and an inhale, the vocal is still a pad.
4. **Do not add a hall on a stem that already has a hall.** Delay throws beat extra reverb.
5. **Tuning is correction unless the genre is the effect.** If Auto-Tune is the sound, say so in the brief. If it is not, hide it.

## Session Setup

- One track: `VO_lead` (center)
- One or two: `VO_double_L` / `VO_double_R` (chorus and maybe pre)
- Optional: `VO_harm_high`, `VO_harm_low`
- Optional: `VO_adlib` (sparse)
- Optional: `VO_whisper` or `VO_spoken` for verse contrast
- Sends: short plate, 1/8 or 1/4 delay (filtered), nothing else until the dry picture is good

If the exported "vocals" stem is a stereo brick of lead+harmony+verb, split again (Advanced Split) or Cover a drier take. You cannot un-stack a stew with EQ.

## Comping

Listen in solo, then against the beat:

| Keep | Throw |
|---|---|
| Intelligible title words | Melisma that hides the lyric |
| A crack, catch, or spoken grain | Perfectly even vibrato on every note |
| Phrase-end that lands on the grid | Rushed last syllable |
| One distinctive dipthong | Identical vowels bar after bar |

Crossfade comps. Do not leave a click at 2:13 that you will "fix in the master."

## Doubles and stacks

- Record or generate doubles **after** the lead is comped, so they follow the keeper
- Chorus doubles: 1–2 dB down, high-pass ~150 Hz, slightly wider, never louder than the lead
- Harmony: different vowel length than the lead; stack thirds only where the chorus already has space
- Unison stacks of 8 AI voices is how you get a fake choir. Three well-placed parts beat eight

Suno Cover with a tighter vocal is valid if the bones of the melody are right. Prompt the Cover for *drier, closer, more consonants* — not "more emotional."

## Ad-libs

Ad-libs are punctuation. Place them in rests, last-chorus only, or one answer in verse 2.

- One ad-lib lane, not a wallpaper
- High-pass and duck under the lead
- If you cannot mute the ad-lib lane without the song dying, they are covering a weak hook — fix the hook (`lyric-craft`)

## Tuning and timing

- Correct pitch to the key you measured, not to a "bright" default
- Hold the title note; do not quantize the life out of it
- Nudge late consonants forward if the model swallowed them
- Replace a line that will not tune (`lyricist` rewrite, then Replace/Cover)

Human overdub: even a spoken count-in, a real breath bed, or a doubled last chorus line collapses the generator sheen. One real layer is worth another 20 generations.

## Vocal chain (starting point)

1. Gain so the lead peaks around −10 dBFS before processing
2. Subtractive EQ: rumble, 250–400 Hz wool if the stem is chesty
3. De-esser (AI loves 6–8 kHz "air" that is sibilance)
4. Compression only if the take still jumps — many AI leads barely move; extra compression makes them deader
5. Presence 2–5 kHz only until the lyric survives a phone
6. Delay send on the last word of the hook; short plate on a send
7. Automation: ride the title 0.5–1 dB up; dip competing stacks

If the stem is already limited, skip the compressor. See `music-mix-master` for baked processing.

## Intelligibility checks

- Phone speaker, 40% volume: can you write the title down?
- Car or headphones: do S's cut your ear off? De-ess, do not smash the master
- Mono: does the lead still sit in the middle or vanish into the stack?

## Anti-Patterns

- Choir-stacking the verse because the lead is weak
- Second hall on an already-wet Suno vocal
- Tuning every note to the same vibrato depth
- Ad-libs through the entire song
- Replacing mix work with "make the vocal louder"
- Prompting a living artist's ad-lib vocabulary
- Shipping the generator vocal stem as the final without a comp

## Best Practices

- Fix the lyric scan before you spend an hour on Melodyne
- Dry the picture first; wet is a send
- Mute stacks: if the chorus still works, the lead is the record
- Stop stacking when `a-and-r-reviewer` can hum the hook

## Related Skills

- `lyric-craft` — unsingable lines are a lyric problem
- `suno-prompting` — drier Covers and vocal character in the style field
- `music-mix-master` — vocal level vs kick, streaming master
- `music-arrangement` — where the vocal should be alone vs stacked
- `ai-music-production` — where this sits in the pipeline
- `brand-voice` — consistent artist speech patterns across songs
