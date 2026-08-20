---
name: music-mix-master
description: Mixing and mastering AI-generated stems. Covers gain staging baked-in Suno/Udio splits, high-pass cleanup, vocal chains, low-end repair, reference matching, and streaming loudness. Use when finishing AI music in a DAW, mixing Suno stems, or mastering a track for Spotify/Apple/YouTube.
---

# Music Mix and Master

AI stems are not close-mics. They are a split of a bounce that was already EQ'd, compressed, and often limited. Your job is to pull that processing out of the way, rebuild a balance, then master like a normal single.

## When to Activate

- User imported Suno, Udio, or splitter stems into a DAW
- The track is loud but small, muddy, or "already mastered" and still amateur
- Vocal sits on top of a smear instead of in a mix
- Preparing a streaming master (LUFS / true peak)
- Replacing AI drums or bass and needing the rest to fit

Use `ai-music-production` for the pipeline around this. Use `mix-reviewer` to critique a bounce. Use `suno-prompting` only if the stems themselves are too dense to mix — that is a generation problem.

## Core Rules

1. **Assume processing is baked in.** A 32-bit float export prevents the *file* from clipping. It does not undo the generator's limiter.
2. **Gain-stage first.** Pull every stem down until the mix bus peaks around **−6 dBFS** with no plugins.
3. **High-pass everything that is not kick or bass.** AI low-mids are how "expensive" generations still sound cheap.
4. **Fix the arrangement in faders before you reach for a saturator.**
5. **Master last, to a spec, against a reference.** Loud is not finished.

## Session Setup

1. Match the DAW tempo to Suno Studio **Manual BPM**. If you skipped that, detect tempo from the kick, then warp. Fighting drift for an hour is usually worse than re-exporting.
2. Same time signature as the brief (usually 4/4).
3. Color and name stems: `DR_kick`, `DR_loop`, `BS_808`, `VO_lead`, `VO_stack`, `GX_mute`, `SY_pad`, `FX`.
4. Check polarity/phase: flip the bass against the kick. If the low end gets smaller, you found a cancellation. Align or replace.
5. Identify key before overdubs (tuner on vocal or a pitched stem).

If a stem is mostly bleed (guitar stem that is 40% vocal), do not "surgical EQ" a miracle. Go back to a simpler generation or an Advanced Split. See `ai-music-production`.

## Gain Staging and Cleanup

- All faders down. Bring up kick, then bass, then vocal, then the rest.
- High-pass:
  - vocals ~80–100 Hz
  - guitars/synths ~100–150 Hz (higher if they fight the bass)
  - pads ~150–200 Hz
  - hats/cymbals ~200 Hz+
- Cut a hole instead of boosting: 200–500 Hz mud, 2–4 kHz vocal/cymbal fight, 6–10 kHz ice.
- De-ess generated vocals. Models love 6–8 kHz "air" that is actually sibilant grit.
- If the whole stem is already smashed, do not add a compressor. Add *level*, EQ, and maybe a gentle expander/gate to recover transients.

## Rebuild the Picture

AI mixes often arrive as a vocal glued onto a stereo wall. Rebuild:

| Element | Target |
|---|---|
| Kick | Short, center, owns 50–80 Hz |
| Bass / 808 | Center, side-chain or duck to the kick, no stereo rumble |
| Lead vocal | Center, present at 2–5 kHz, not louder than the chorus hook needs |
| Stacks / doubles | Wider, quieter than the lead, high-passed more aggressively |
| Harmony instruments | Panned; do not all live at 1 kHz in the middle |
| FX / verb returns | Own bus, high-passed, ducked under the vocal |

Replace the weakest layer. Generated drums and subs fail most often. A real 808 or a sampled kit under a keeper vocal is a professional move, not a cheat.

Add **one human layer** if you can: a recorded double, a clap, a guitar, a room tone. It breaks the generator sheen.

## Vocal Chain (starting point, not a religion)

Lead:

1. Subtractive EQ (mud, rumble)
2. De-esser
3. Compression only if the take still moves too much — many AI vocals barely move
4. Small presence EQ if the lyric is unintelligible on a phone
5. Delay (1/8 or 1/4, filtered) rather than a huge hall
6. Short plate or room on a send, not stacked on the stem that already has reverb baked in

If the stem already has a hall on it, do not add another hall. Dry the picture with EQ and a short delay instead.

## Low End

- Mono the bass below ~120 Hz
- One source owns the sub. Kick *or* 808, not both at 40 Hz
- High-pass the master? No. High-pass the clutter.
- If the 808 is a distorted stereo smear, replace it

## Reference Matching

Pick one commercial reference in the same genre and loudness neighborhood. Compare in this order:

1. Kick vs vocal level
2. Bass length and mono-ness
3. Chorus width vs verse width
4. Brightness at 8–12 kHz (AI often over-sparkles)
5. How loud the mix is *before* the limiter — if your unmastered bounce is already louder than their unmastered-feeling mix, you are still in generator-limiter land. Pull down.

A/B at equal loudness. If you only A/B after both are slammed, you will always pick the brighter smash.

## Mastering Specs

For a typical streaming single:

| Spec | Target |
|---|---|
| Integrated loudness | **-14 LUFS** (Spotify/Apple-class normalization) |
| True peak | **≤ −1.0 dBTP** (safer: −1.5) |
| Short-term | Should not hover at −9 LUFS the whole song unless the genre is that |
| Stereo | Check mono fold-down; AI widths collapse badly |

Club/DJ versions can be louder. Do not use a club master as the Spotify file.

You can check a bounce with ffmpeg loudnorm (diagnostic, then do the real master in the DAW):

```bash
ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=summary -f null -
```

Read `input_i` and `input_tp`. If input already is −8 LUFS, the mix was limited too early — go back to faders, do not "normalize" on top.

## Mix Checklist

- [ ] Session BPM matches Manual BPM
- [ ] Mix bus ~−6 dBFS peak with plugins off
- [ ] Kick and bass survive a phone speaker *and* headphones
- [ ] Lyric is intelligible at low volume
- [ ] Chorus is wider or denser than the verse, not just louder
- [ ] No new hiss or metallic 8 kHz crust
- [ ] Mono fold-down still has a kick and a vocal
- [ ] One reference pass at matched loudness
- [ ] Master hits −14 LUFS / −1 dBTP without pumping the verse into the chorus

## Anti-Patterns

- Limiting the generator MP3 "to make it loud"
- Treating stems as dry mics
- Boosting 10 kHz on every stem because the reference is bright
- Widening the 808
- Adding reverb to a stem that already has a hall
- Skipping gain staging and "fixing it in Ozone"
- Mastering before the arrangement balance is done
- Different limiter settings per section instead of a mix that already moves
- Ignoring bleed and trying to notch a vocal out of a guitar stem

## Best Practices

- If the split is dirty, regenerate simpler or Advanced Split — mixing cannot unbake a stew
- Replace drums/sub before you spend an hour on a pad
- Check the master in a car or on a phone before you call it done
- Leave headroom in the mix; let the master be a few dB of glue, not a rescue
- Keep the unmastered mix. Stores and future remixes need it

## Related Skills

- `ai-music-production` — pipeline, Studio export, A&R gate
- `suno-prompting` — when the stem density is a prompt problem
- `lyric-craft` — unintelligible words are sometimes a lyric problem
- `vocal-production` — lead chain before the mix bus
- `music-arrangement` — mute decisions before extra EQ
- `music-release` — the file you upload after this master
- `video-editing` — loudness of the audio under a visual
- `taste` — music video after the master is locked
