---
name: lyric-craft
description: Singable lyric writing for AI vocal models. Covers scansion, syllable budget, hook placement, Suno structure tags, and rewriting lines that look good on a page but fail in a melody. Use when writing or fixing song lyrics, hooks, or verses for Suno, Udio, or any sung-AI track.
---

# Lyric Craft

A lyric that reads clever and a lyric that *sings* are different objects. AI vocal models punish extra syllables, abstract metaphors with no stress pattern, and missing section tags. Write for the mouth and the grid.

## When to Activate

- User wants lyrics, a hook, a verse, or a full lyric sheet for an AI vocal
- Generated vocals slur, rush, or ignore the chorus
- Rewriting page-poetry into something a singer can land
- User mentions scansion, syllable count, structure tags, or "the lyrics don't fit"
- Building a title hook that can survive one listen

Use `suno-prompting` for the style field. Use `lyricist` when delegating the write. Use `ai-music-production` for where lyrics sit in the pipeline.

## Core Rules

1. **Count syllables on the sung line, not the sentence.** 6–10 syllables is the default pop/R&B line. Rap-sung can go longer if the groove is written for it.
2. **The title is the chorus.** If you cannot hear the title on a downbeat, it is not a hook yet.
3. **Structure tags are part of the lyric file.** `[Verse]` and `[Chorus]` are arrangement, not decoration.
4. **Concrete before clever.** A night bus, a cracked phone, a name. Then the turn of phrase.
5. **One job per section.** Verse = new information. Pre = lift. Chorus = thesis. Bridge = new angle or strip.

## Scansion

Speak the line in time, then sing it on one note. If you have to cram, rewrite.

| Problem | Page line | Sung rewrite |
|---|---|---|
| Too many syllables | I am standing in the doorway of the apartment we used to share | I wait in the doorway we used to share |
| Stress on the wrong word | Remember **to** forget me | Forget me **on** purpose |
| Unsingable cluster | glimpsed / strengths / worlds | saw / force / world |
| Abstract stack | the architecture of our undoing | we took the long way home |

Mark the beat you want the title on:

```text
1    2    3    4
We don't stay past the red light
```

If the title falls on "the" or "of", move it.

## Structure Tags

Put these in the lyrics field. Suno/Udio treat them as section cues.

```text
[Intro]

[Verse]
[Pre-Chorus]
[Chorus]

[Verse]
[Pre-Chorus]
[Chorus]

[Bridge]
[Final Chorus]
[Outro]
```

Optional delivery lines (not sung): `[Whisper]`, `[Dry Vocal]`, `[Stacked Harmonies]`, `[Spoken]`, `[Belt]`.

Do not put plot in the tags. `[Sad Verse About The Divorce]` will not make it sad. The lines will.

## Section Jobs

### Title / hook

- 3–8 words
- Repeatable without embarrassment
- Lands on a long note or a downbeat
- Survives being the only line someone remembers

### Verse

- Camera shots, not essays
- New information in verse 2 (new place, new time, new decision)
- End the last verse line so the pre can lift

### Pre-chorus

- Shorter lines, rising end-rhyme or rising melody implication
- Do not state the title yet unless the genre is a title-pre song on purpose

### Chorus

- Title + one image + one consequence
- Repeat. AI models *and* humans need the repeat
- Leave a rest. A chorus with no breath is a paragraph

### Bridge

- Contrast: fewer words, a confession, or a role reversal
- 4–8 lines, then get out
- If the bridge restates the chorus in fancier words, delete it

## Rhyme and Sound

- Perfect rhyme is fine. Forced triple-rhyme every line sounds nursery-school
- Internal rhyme and assonance help AI phrasing more than dense end-rhyme
- Avoid stacking `-tion` / `-ing` endings — they turn into mush in generated vocals
- Alliteration on the hook helps consonants survive model smoothing

## AI-Specific Failure Modes

Generated singers will:

- Swallow the last word of a long line
- Turn "I" / "you" into a vowel wash if the line has no consonants
- Ignore a chorus that is not tagged
- Rush lists ("Monday Tuesday Wednesday Thursday")
- Invent extra syllables on words like *every*, *family*, *actually*

Rewrite lists as two concrete items. Put a plosive or sibilant in each line (`p`, `t`, `k`, `s`) so the vocal has edges.

## Worked Example

Brief: 92 BPM alt-R&B, title **Red Light**, late-night city, do not over-explain.

```text
[Intro]
[Dry Vocal]
Red light

[Verse]
Phone face-down on the dash
City sweating through the glass
You said wait, I already passed

[Pre-Chorus]
Count to three with the engine on
If I mean it, I'll be gone

[Chorus]
[Stacked Harmonies]
We don't stay past the red light
We don't say what we mean
If the street don't change its mind
I won't either, not tonight
We don't stay past the red light

[Verse]
Same song in a different car
Your jacket still in the back
I drive like I'm being watched

[Pre-Chorus]
Count to three with the engine on
If I mean it, I'll be gone

[Chorus]
We don't stay past the red light
We don't say what we mean
If the street don't change its mind
I won't either, not tonight
We don't stay past the red light

[Bridge]
[Whisper]
Green don't make it honest
Go don't make it clean

[Final Chorus]
[Stacked Harmonies]
We don't stay past the red light
We don't say what we mean
If the street don't change its mind
I won't either
We don't stay past the red light

[Outro]
Red light
```

Check: title on a strong beat, verse images you can film, pre shorter than the chorus, bridge is contrast, outro is a fragment — not a new thesis.

## Rewrite Loop

When a generated vocal fails a line:

1. Print the line with syllable counts
2. Cut until it is 6–10 (or a conscious 12)
3. Move the title or the verb onto beat 1 or 3
4. Replace a mush word (`everything`, `beautiful`, `emotional`) with an object
5. Regenerate **only that section** if the editor can Replace; otherwise Cover the take after the lyric fix

## Anti-Patterns

- Unbroken prose pasted into Custom Mode
- No `[Chorus]` tag, then blaming the model for never hooking
- Chorus that does not contain the title
- Verse 2 as a paraphrase of verse 1
- Forcing a living artist's cadence or signature ad-libs
- Abstract stacks: "the silence of the echo of the void of us"
- Syllable stuffing to keep a rhyme
- A bridge that is a fourth chorus
- Writing for the page ("I shall", "o'er") unless that is the genre

## Best Practices

- Read the whole lyric out loud in time before generating
- Keep a title list of 10; pick the one you would still say in a room
- Match line lengths inside a section so the melody can repeat
- Put the artist's real speech patterns in if you have them (`brand-voice`)
- Stop adding verses when the story has turned once

## Related Skills

- `ai-music-production` — where lyrics sit in the release pipeline
- `suno-prompting` — style field and iteration tools
- `brand-voice` — consistent artist persona
- `article-writing` — do not use this for lyrics; different object
- `content-engine` — rollout copy after the song exists
