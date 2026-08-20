---
name: music-release
description: Release operations for AI-assisted records. Covers metadata, writer splits, AI disclosure, ISRC/UPC, cover art, DSP delivery, loudness of the master vs social clips, and playlist pitching without payola. Use when shipping a Suno/DAW track to stores, claiming rights, or preparing a single rollout.
---

# Music Release

A finished mix is not a release. Stores want metadata, a master that matches the form, credits that would survive a dispute, and a cover that is not the generator's default still.

Do not invent a license. Read the live generator ToS and the distributor's AI rules for the week you upload.

## When to Activate

- User is about to upload to DistroKid, TuneCore, CD Baby, or a label portal
- Questions about ISRC, UPC, writers, splits, explicit flags, or AI disclosure
- Cover art, canvas, clips, and the difference between the master and the TikTok file
- Playlist pitching, pre-save, and street-date timing
- User says "put it on Spotify", "register this song", "do I own this Suno track"

Audio finish is `music-mix-master`. Visual direction is `taste`. Rollout copy is `content-engine`. This skill is the release packet.

## Core Rules

1. **Rights follow the plan you generated under, not a vibe.** Free-tier files are usually not store-safe. Paid-plan commercial terms change — check them.
2. **Tell the truth in metadata.** If a model wrote melody or vocal, say so where the store or society asks.
3. **One master, many clips.** Do not upload a clipped, limited social bounce as the Spotify master.
4. **Credits are a list of humans and roles**, not "made with AI."
5. **Do not pay for fake streams or guaranteed playlist slots.** Pitch; do not buy a chart.

## Release packet

```text
TITLE:
PRIMARY ARTIST:
FEATURED:
WRITERS / COMPOSERS:     # legal names
PRODUCERS / MIX / MASTER:
AI TOOLS + WHAT THEY DID: # e.g. Suno v5: melody+vocal bed; human: lyrics, arrangement, mix
SPLIT %:                 # must sum to 100
ISRC:                    # assigned by distributor or your own
UPC:                     # the product, not the track
GENRE / SUBGENRE:
LANGUAGE:
EXPLICIT:                # yes/no — match the lyric
TERRITORY:
STREET DATE:
MASTER FILE:             # WAV, -14 LUFS / -1 dBTP unless club version
ARTWORK:                 # 3000x3000 min, no extra small text
```

If there is no writer split written down, you do not have a collaboration. You have a future argument.

## Masters vs clips

| File | Spec | Use |
|---|---|---|
| Master WAV | -14 LUFS integrated, true peak ≤ -1.0 dBTP, 44.1 or 48 kHz | Stores, future remixes |
| Unmastered mix | headroom, no limiter rescue | Archive |
| Social clip | 15–45 s, hook in first 1 s, louder/brighter OK | Reels / TikTok / Shorts |
| Clean / radio | if the explicit master cannot be the only file | DSP clean slot |

Do not let `content-engine` crop the only copy of the master. Duplicate, then clip.

Check the master:

```bash
ffmpeg -i master.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=summary -f null -
```

If `input_i` is already around -8, go back to `music-mix-master`. Stores will turn you down; they will not make you punchier.

## Artwork

- Square, high-res, no logos of stores, no tiny lyrics
- Do not ship a default Suno still
- `fal-ai-media` for generation, `taste` if this is also a video world
- The cover should still read at 64 px (playlist row)

## Disclosure and credits

Typical credit block:

```text
Written by [names]
Produced by [names]
Vocals generated with [tool + model] and produced by [name]
Mixed / mastered by [name]
```

Collecting societies and some stores now ask whether AI was used in the composition, vocal, or sound recording. Answer the form you are looking at. Do not hide a Suno topline behind "all rights reserved" theater.

Living-artist clones, uploaded copyrighted instrumentals, and celebrity likeness in artwork are not a metadata problem. They are a do-not-release problem. `suno-prompting` already bans living-artist names in the style field.

## Delivery

- Distributor: DistroKid / TuneCore / similar are fine for independents
- Delivery lead time: often 1–2 weeks before street date; do not promise Friday if you upload Thursday
- Pre-save links after the UPC exists
- Canvas / visualizer: `video-editing` after the master is locked
- Pitching: editorial forms, independent curators, your own audience first (`content-engine`, `social-publisher`). No bots.

## Anti-Patterns

- Uploading a free-tier MP3 to a store
- Lying on the AI disclosure checkbox
- Social clip as the master
- Cover art with unreadable type and three watermarks
- "Written by AI" as the only writer (societies need humans they can pay — if there are none, you may not have a registrable work in that territory)
- Buying streams
- Changing the title after ISRC assignment without a real reason

## Best Practices

- Freeze title, credits, and master hash before you pitch
- Keep the unmastered session
- Put the same ISRC in the DAW session notes
- Run `a-and-r-reviewer` before you pay for distribution
- After it is live, rollout is `content-engine` / `marketing-campaign`, not another generation

## Related Skills

- `ai-music-production` — pipeline into this packet
- `music-mix-master` — the file you actually upload
- `a-and-r-reviewer` — last skip-test before street date
- `content-engine` — announcement copy
- `social-publisher` / `crosspost` — day-of posts
- `taste` / `video-editing` / `fal-ai-media` — cover and motion
- `brand-voice` — artist name and bio consistency
- `marketing-campaign` — if this is a dated launch, not a quiet upload
