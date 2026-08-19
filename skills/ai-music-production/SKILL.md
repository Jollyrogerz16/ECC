---
name: ai-music-production
description: Professional AI music pipeline from brief through Suno/Udio generation, stem export, DAW remix, mix, master, and release. Use when the user wants to make a song sound finished, take Suno tracks to the next level, produce AI music, or ship a release instead of a demo.
origin: ECC
---

# AI Music Production

Suno can write a convincing demo in thirty seconds. A record still needs a brief, a real arrangement, lyrics that scan, twenty discarded takes, stems in a DAW, and a mix that was built on purpose.

Do not treat the first generation as the master.

## When to Activate

- User wants to make AI music that sounds professional, not like a Suno export
- Finishing, remixing, or releasing tracks already generated in Suno, Udio, or similar
- Writing a production brief, arrangement map, or A&R checklist for a song
- User says "produce a song", "make this sound finished", "Suno stems", "AI music", or "master this track"
- Pairing generation with a DAW (Logic, Ableton, FL Studio, Reaper, Studio One)

Delegate generator-field craft to `suno-prompting`. Delegate lyrics to `lyric-craft`. Delegate mix/master decisions to `music-mix-master`. Delegate the session to `music-producer`, `lyricist`, and `mix-reviewer`.

## Core Thesis

1. **Generation is pre-production.** The model is a songwriter plus a session band. You are still the producer.
2. **Taste is decided before the first prompt.** If you only judge at the end, every take was a guess.
3. **Stems plus a DAW is the professional step.** Leaving the stereo bounce as the final is how AI music stays sounding like AI music.
4. **AI stems are already processed.** Pull them down, rebuild the balance, then add your own chain. See `music-mix-master`.
5. **One idea, many takes, ruthless selects.** Generate 8–20 versions. Keep the best eight bars from each, not the least-bad full song.

## The Pipeline

```
Brief + references
  → Arrangement map
  → Lyrics (lyric-craft)
  → Style prompt (suno-prompting)
  → Custom Mode generation (8–20 takes)
  → Selects / Extend / Cover / Replace
  → Lock Manual BPM + export WAV stems
  → DAW remix + human overdubs
  → Mix
  → Master to streaming specs
  → Metadata, legal, release
```

Do not skip layers. Do not ask one tool to do every layer.

## Layer 1: Brief (before any prompt)

Write this down. If it is not written, it is not a brief.

```text
TITLE:
GENRE + SUBGENRE:          # one primary, one accent max
BPM / TIME SIGNATURE:      # e.g. 102 BPM, 4/4
KEY / MODE:                # e.g. F# minor
VOCAL:                     # gender range, age, grit, accent, lead vs stacked
EMOTION:                   # one sentence, not a mood board
REFERENCES (2–3):          # songs for groove, vocal, or mix — never for cloning
ARRANGEMENT:               # intro / verse / pre / chorus / verse / pre / chorus / bridge / final / outro
DURATION TARGET:           # streaming single ≈ 2:30–3:30
NON-GOALS:                 # what this song is not
```

Pick two or three reference tracks and name what you are stealing from each: drum pocket, vocal tone, mix brightness, arrangement density. Do not put living artist names in the generator. Translate the reference into production language (`suno-prompting`).

## Layer 2: Arrangement Map

Write the song on an 8-bar grid before generating. Suno (and every other model) collapses into a wall of sound when it has no section jobs.

| Time (3:00 @ 100 BPM) | Section | Job |
|---|---|---|
| 0:00–0:10 | Intro | Signature sound, no vocal, or a hook fragment |
| 0:10–0:40 | Verse 1 | Story, space, fewer instruments |
| 0:40–0:55 | Pre-chorus | Lift. New rhythm or harmony. Do not give away the hook |
| 0:55–1:20 | Chorus 1 | Title hook. Highest memorability. Leave air |
| 1:20–1:50 | Verse 2 | New information. Slightly denser than verse 1 |
| 1:50–2:05 | Pre-chorus | Familiar, maybe a stacked vocal |
| 2:05–2:30 | Chorus 2 | Same hook, extra layer (harmony, percussion) |
| 2:30–2:50 | Bridge | Contrast: strip, modulate, or change the drum pattern |
| 2:50–3:15 | Final chorus | Peak. Then stop or eight-bar outro. Do not keep stacking forever |

If the chorus and the verse use the same energy, the generation failed even if it sounds "full."

## Layer 3: Lyrics and Style

- Lyrics: `lyric-craft`. Structure tags in the lyrics field. Syllables that a singer can actually land.
- Style: `suno-prompting`. Four to eight descriptors. Genre first. BPM. Vocal character. Production era. No living-artist names.

Simple Mode is for throwing ideas at the wall. Custom Mode is the default the moment you care about the result.

## Layer 4: Generation Loop

Work in Custom Mode on a current Suno model (v4.5 / v5 as of 2026). Udio is a valid alternate when you want more idiosyncratic vocals. Stable Audio-class models are better for loops, beds, and trailers than for vocal singles.

For each concept:

1. Generate 4 takes from the same brief.
2. Keep only sections that pass the A&R gate below.
3. Use **Extend** to grow a strong ending, not to rescue a weak chorus.
4. Use **Cover** to recast a keeper in a tighter style or different vocal.
5. Use **Replace** / in-painting (when the editor offers it) on one bad section, not the whole song.
6. Repeat until you have one skeleton that survives a car-speaker listen.

Name files as you go: `04-chorus-take-b-keeper.wav`. If you cannot find the keeper tomorrow, the session was wasted.

## Layer 5: Suno Studio and Stems

This is where a Suno user becomes a producer.

1. Open the keeper in **Suno Studio** (Studio 2.0 added MIDI, a piano roll, automation, and a better splitter).
2. Set **Manual BPM** before export so stems lock to a DAW grid. AI tempo drifts; a bounced stereo file that "feels like 102" may actually wander.
3. Export **WAV stems**, 32-bit float when the plan allows it. Premier-tier Studio 2.0 supports unlimited 32-bit multitrack export. Auto Split (Pro/Premier) yields up to 12 stems; Advanced Split (Premier) is for surgical instrument picks.
4. Simpler arrangements split cleaner. If the guitar stem is a soup of piano and vocal bleed, the generation was too dense — go back, do not "EQ it out."
5. Suno Studio is not a VST host. Finish in a real DAW.

If the user's plan has no stem export, say so and fall back to an external splitter as a last resort. Expect more bleed. Still remix.

Set the DAW session to the same Manual BPM and time signature (almost always 4/4 unless the brief said otherwise) before dragging stems in.

## Layer 6: DAW Remix

Import, then treat the session like a band recording that arrived already mixed:

- Gain-stage every stem down. Aim for mix-bus peaks around −6 dBFS before processing. See `music-mix-master`.
- High-pass everything that is not kick or bass.
- Rebuild the balance from silence. Do not leave the AI's stereo image as law.
- Replace the weakest layer if it is cheaper than repairing it. AI drums and low end fail most often. A real 808, a sampled break, or a played bass guitar will outrun another generation.
- Add one human thing: a recorded vocal double, a guitar stab, a foley texture, a talk box, a breath. One real sound collapses the "this is AI" tell.
- Check key with a tuner on the vocal or a pitched instrument before overdubbing.

## Layer 7: Mix and Master

Follow `music-mix-master`. Streaming target for a pop/electronic single is typically **−14 LUFS integrated**, true peak **≤ −1.0 dBTP**. Do not crush a Suno bounce with a limiter and call it mastered.

## Layer 8: A&R Gate

Play the song in three environments before you mix for release: laptop speaker, phone, car or headphones. Fail the track if any of these are true:

- You cannot hum the chorus after one listen
- Verse and chorus are the same density
- Lyrics do not land on the beat (see `lyric-craft`)
- The vocal is a costume, not a person (over-vowel, no consonants, no breaths)
- The low end is a smear, not a kick and a bass
- It only sounds expensive in the generator's own player
- You would skip it at 0:12 if it came on in a playlist you did not make

## Layer 9: Release

- **Rights:** Commercial use follows the generator's current paid-plan terms. Free-tier generations are usually not release-safe. Read the live ToS; do not invent a license.
- **Disclosure:** Some stores and collecting societies want AI involvement declared. Put the truth in the metadata even when a checkbox is optional.
- **Credits:** Prompt engineer, lyricist, mixer, and any human performers. "Made in Suno" is not a credit block.
- **Metadata:** Title, writers, ISRC, genre, language, explicit flag, cover art that is not a default generator still.
- **Distribution:** DistroKid, TuneCore, and similar are fine. Do not upload a track you could not defend as yours.
- **Video:** `taste` plus `video-editing` if the release needs a visual.

## Tool Map

| Job | Tool | Notes |
|---|---|---|
| Vocal single, full song | Suno Custom Mode + Studio | Default path for this skill |
| Idiosyncratic vocals | Udio | Same pipeline after export |
| Loops, beds, trailers | Stable Audio-class / fal.ai | `fal-ai-media` for short beds |
| Lyrics | `lyric-craft` + `lyricist` | Structure tags live in the lyrics field |
| Style prompts | `suno-prompting` | No living-artist names |
| Mix / master | DAW + `music-mix-master` | Suno Studio has no VST host |
| Loudness check | `ffmpeg-normalize` / DAW meter | See mix skill for the command |
| Music video | `taste`, `video-editing` | After the audio is locked |

## Worked Example

Brief: late-night alt-R&B single, 92 BPM, A minor, male falsetto + textured chest voice, rainy-city 3am, references for *groove* and *vocal air* only.

Arrangement: 8-bar pad intro → verse with dry vocal and muted guitar → pre that adds a side-chained pad → chorus with stacked falsetto and a simple four-on-the-floor under the swing → verse 2 with whispered ad-libs → bridge that drops to voice and sub → final chorus, no extra drop, 4-bar delay outro.

Prompting: `suno-prompting` style line, `lyric-craft` lyric block with `[Intro]` through `[Outro]`.

Generation: 12 takes. Keep take 7 chorus and take 3 verse. Cover take 7 with a tighter vocal. Extend the outro.

Studio: Manual BPM 92, Auto Split to WAV, import to Ableton at 92 BPM.

DAW: replace the 808, high-pass guitars at 120 Hz, vocal chain, one recorded breath layer, mix, −14 LUFS master.

## Anti-Patterns

- Prompting "epic cinematic emotional masterpiece" and shipping the first stereo bounce
- Putting Drake, The Weeknd, or any living artist in the style field
- Writing lyrics with no structure tags and wondering why the chorus never arrives
- Extending a bad chorus hoping length will create a hook
- Mixing against the generator's already-limited bounce instead of stems
- Assuming stems are clean close-mics — they are a split of a finished mix
- Skipping Manual BPM, then fighting warp markers for an hour
- Mastering to −8 LUFS "so it is loud"
- Releasing a free-tier file into a store
- Generating a new mix-bus limiter setting for every section instead of mixing

## Best Practices

- Write the brief in chat or a file before touching the generator
- Generate more than you keep. Selects are the job
- Prefer a simpler arrangement that splits well over a dense one that cannot be remixed
- Put one human sound in the session
- Check the song outside the generator UI
- Stop when the A&R gate passes. More generations after that are a different song

## Related Skills

- `suno-prompting` — Custom Mode style, tags, Cover/Extend
- `lyric-craft` — singable lyrics and section tags
- `music-mix-master` — stem gain-staging, mix, streaming master
- `fal-ai-media` — short beds, SFX, trailer audio
- `taste` — visual direction once the audio is locked
- `video-editing` — music video / visualizer assembly
- `brand-voice` — artist persona that must stay consistent across releases
- `content-engine` — rollout copy after the master exists
