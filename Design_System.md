# Human-Centered Design System --- Cognitive & Memory Companion

**Problem Statement:** 26003\
**Organization:** Ministry of Development of North Eastern Region
(MDoNER)\
**Version:** 1.0\
**Date:** 27 August 2026

------------------------------------------------------------------------

## 1. Design Direction

### Product feeling

This product should feel:

**Warm. Familiar. Calm. Human. Respectful.**

It should NOT feel like:

-   An AI dashboard
-   A hospital management system
-   A futuristic robot interface
-   A children's game
-   A banking application
-   A generic wellness app
-   A "glassmorphism" AI product

The visual experience should communicate:

> **"This is a familiar place that helps me with my day."**

The older adult should feel welcomed rather than evaluated.

Research-led dementia design guidance emphasizes involving people
affected by dementia in design, avoiding jargon and complex calls to
action, providing explicit navigation, using high contrast, simple
typography, and minimizing disorientation.
citeturn0search0turn0search4

------------------------------------------------------------------------

# 2. Design Philosophy

## 2.1 Human first, technology second

Do not make AI the visual hero.

There should be no giant:

> "AI Cognitive Engine"

on the home screen.

AI works quietly in the background.

The user sees:

> "Today's activity"

not:

> "AI Recommendation #42"

------------------------------------------------------------------------

## 2.2 Familiarity over novelty

Use visual patterns that older adults already understand:

-   Family photos
-   Cards resembling physical memory albums
-   Simple calendars
-   Familiar household imagery
-   Clear buttons
-   Straightforward lists

Avoid constantly changing layouts.

------------------------------------------------------------------------

## 2.3 Calm over stimulation

The app is for people who may become confused or overwhelmed.

Therefore:

-   No excessive animation
-   No flashing elements
-   No moving backgrounds
-   No aggressive gradients
-   No dense dashboards
-   No unnecessary popups
-   No countdown timers by default

------------------------------------------------------------------------

## 2.4 One decision at a time

Every important screen should have one obvious primary action.

Bad:

> Start Game / View Progress / Settings / AI Coach / Memories / Reports
> / Community / Profile

Good:

> **Good morning, Asha.**

> You have one reminder.

> **Take medicine**

Then a secondary option:

> View today's plan

------------------------------------------------------------------------

# 3. Visual Personality

## 3.1 Brand character

The interface should feel like:

**A well-designed personal memory book combined with a calm modern
tablet application.**

Not:

**A futuristic AI laboratory.**

### Personality keywords

-   Gentle
-   Warm
-   Trustworthy
-   Familiar
-   Quiet
-   Optimistic
-   Respectful
-   Personal

------------------------------------------------------------------------

# 4. Regional Color & Visual Identity System

SMRITI must NOT use one universal color palette for the entire
North Eastern Region.

The eight states of the NER must have distinct visual identities.

The product architecture remains shared, but the visual expression
changes according to the selected region.

The regional system controls:

- Primary color
- Secondary color
- Accent color
- Background
- Surface
- Text
- Muted text
- Borders
- Illustration accents
- Pattern colors
- Typography personality
- Motion personality

Therefore:

    Assam SMRITI
        ≠
    Meghalaya SMRITI
        ≠
    Nagaland SMRITI
        ≠
    Sikkim SMRITI

But all remain recognizably:

    SMRITI


## 4.1 Core Design Principle

The platform should communicate:

> "This understands my world."

Not:

> "This app added a North-East theme."

Regional identity must therefore be deeper than changing a button color.

A regional theme consists of:

    Color
      +
    Typography
      +
    Pattern
      +
    Illustration
      +
    Photography
      +
    Content
      +
    Motion
      +
    Regional language/script support


## 4.2 Regional Theme Architecture

The application must use semantic design tokens.

Components must never hard-code regional colors.

Bad:

```tsx
<button className="bg-green-700">

Good:

<button className="bg-[var(--smriti-primary)]">

The active region controls the value of:

--smriti-primary
--smriti-secondary
--smriti-accent
--smriti-bg
--smriti-surface
--smriti-text
--smriti-muted
--smriti-border
--smriti-success
--smriti-warning
--smriti-error

# 5. Color Rule
These palettes are starting design directions.

They are NOT claims that an entire state has one official cultural color.

Final production palettes should be validated through regional research,
accessibility testing, and cultural review.

## 5.1 Assam
Personality

Warm • Familiar • Graceful • Grounded • Welcoming

Color direction
Primary:       #8B2F2F
Secondary:     #B8893C
Accent:        #D8A84E

Background:    #F7F1E6
Surface:       #FFFDF8

Text:          #26332F
Muted:         #6F756F
Border:        rgba(38, 51, 47, 0.12)

Success:       #527A5A
Warning:       #A97836
Error:         #A7443D
Visual language

Use subtle inspiration from:

Assamese textile rhythm
Muga silk
Brahmaputra landscapes
Earth
Craft
Warm natural materials

Use flowing shapes and restrained woven-inspired details.

Avoid turning the interface into a traditional costume or tourism website.

## 5.2 Arunachal Pradesh
Personality

Natural • Spacious • Peaceful • Earthy • Mountainous

Color direction
Primary:       #315B45
Secondary:     #7A5A3A
Accent:        #D58A3A

Background:    #F2F0E7
Surface:       #FCFBF5

Text:          #24312B
Muted:         #70766F
Border:        rgba(36, 49, 43, 0.12)

Success:       #527A5A
Warning:       #A87936
Error:         #A84B42
Visual language

Use:

Mountain layers
Forest-inspired geometry
Earth tones
Horizon lines
Spacious layouts
Natural textures

## 5.3 Manipur

Personality

Artistic • Refined • Balanced • Handcrafted • Warm

Color direction
Primary:       #713A43
Secondary:     #526A57
Accent:        #C89B5B

Background:    #F7F0E7
Surface:       #FFFDFC

Text:          #2D302D
Muted:         #74746E
Border:        rgba(45, 48, 45, 0.12)

Success:       #527A5A
Warning:       #A87936
Error:         #A74646
Visual language

Use:

Refined geometric details
Textile-inspired rhythm
Balanced repetition
Small handcrafted accents
Elegant borders

## 5.4 Meghalaya

Personality

Misty • Organic • Calm • Fresh • Airy

Color direction
Primary:       #3E7166
Secondary:     #7896A1
Accent:        #D59A61

Background:    #F1F5F2
Surface:       #FCFEFD

Text:          #273331
Muted:         #717B78
Border:        rgba(39, 51, 49, 0.12)

Success:       #4E8064
Warning:       #A77A44
Error:         #A64D48
Visual language

Use:

Mist-like gradients
Soft contour lines
Rain-inspired details
Organic curves
Forest imagery
Atmospheric layers

## 5.5 Mizoram

Personality

Welcoming • Rhythmic • Lively • Confident • Community-oriented

Color direction
Primary:       #8A3440
Secondary:     #426B50
Accent:        #D8A95A

Background:    #FAF3EA
Surface:       #FFFDFC

Text:          #2D302E
Muted:         #77746E
Border:        rgba(45, 48, 46, 0.12)

Success:       #4E7C5B
Warning:       #A9793F
Error:         #A64747
Visual language

Use:

Woven rhythm
Geometric structures
Community-oriented imagery
Controlled repeating patterns

## 5.6 Nagaland

Personality

Strong • Grounded • Earthy • Structured • Warm

Color direction
Primary:       #4E3B35
Secondary:     #9B4D32
Accent:        #C7954A

Background:    #F5EEE4
Surface:       #FFFDF9

Text:          #282A28
Muted:         #74716B
Border:        rgba(40, 42, 40, 0.12)

Success:       #58745D
Warning:       #A6783D
Error:         #A34B40
Visual language

Use:

Strong geometric rhythm
Earth-inspired surfaces
Restrained patterns
Structured borders
Natural materials

## 5.7 Tripura

Personality

Warm • Artistic • Familiar • Organic • Heritage-inspired

Color direction
Primary:       #9A4936
Secondary:     #3E614E
Accent:        #D39B58

Background:    #F8F0E4
Surface:       #FFFDF8

Text:          #2E302C
Muted:         #77736A
Border:        rgba(46, 48, 44, 0.12)

Success:       #52795D
Warning:       #A97B40
Error:         #A64D42
Visual language

Use:

Terracotta-inspired surfaces
Organic curves
Subtle heritage details
Earth-inspired backgrounds

## 5.8 Sikkim

Personality

Calm • Himalayan • Spacious • Reassuring • Contemplative

Color direction
Primary:       #365C78
Secondary:     #C07A3B
Accent:        #D1A14B

Background:    #F3F1EA
Surface:       #FEFEFC

Text:          #263038
Muted:         #71767A
Border:        rgba(38, 48, 56, 0.12)

Success:       #527A61
Warning:       #A8783E
Error:         #A54A42
Visual language

Use:

Himalayan blue
Mountain horizon lines
Open space
Layered landscape shapes
Subtle warm accents


# 6. Regional Color Rules

The selected regional theme controls the visual environment.

## Background

Use the regional background token.

background: var(--smriti-bg);
Surface

Use the regional surface token.

background: var(--smriti-surface);
Primary Action

Use the regional primary.

background: var(--smriti-primary);
color: var(--smriti-on-primary);
Secondary Action

Use the regional secondary.

Emotional Accent

Use the regional accent sparingly.

Error

Never communicate errors through color alone.

Use:

Icon + Color + Text
Accessibility

Every regional palette must independently pass contrast testing.

Minimum target:

Normal text: 4.5:1
Large text:  3:1

Regional identity must NEVER reduce readability.


---
# 7. Regional Typography System

Typography is part of regional identity.

SMRITI does NOT use one font personality for every region.

However, readability always has higher priority than cultural styling.

The typography system has three layers:

```text
Regional Display
       ↓
Regional Heading
       ↓
Accessible Body/UI

The display and heading fonts may change by region.

The body font must remain highly readable.

## 7.1 Typography Principles

Typography must be:

Large
Clear
Familiar
Comfortable
Script-compatible
Accessible
Easy to scan

Avoid:

Decorative fonts for body text
Thin fonts
Condensed fonts
Excessive font weights
All-caps UI
Long text blocks

## 7.2 Regional Font Architecture

Each region may define:

typography: {
  display: string;
  heading: string;
  body: string;
  ui: string;
}

Example:

typography: {
  display: "RegionalDisplay",
  heading: "RegionalHeading",
  body: "AccessibleSans",
  ui: "AccessibleSans"
}

The regional font must support the required script.

If a regional font does not provide adequate script coverage,
use an appropriate fallback.

Example:

font-family:
  var(--smriti-display),
  var(--smriti-body),
  system-ui,
  sans-serif;
  
## 7.3 Assam Typography

Personality:

Warm
Elegant
Human
Traditional influence
Modern readability

Use a refined Assamese-compatible display/heading face.

Body:

Clean sans-serif

Support:

Assamese
English
Hindi where required

## 7.4 Arunachal Pradesh Typography

Personality:

Natural
Open
Calm
Spacious

Use a clean modern display face with generous spacing.

Body:

Readable sans-serif

## 7.5 Manipur Typography

Personality:

Artistic
Balanced
Refined

Use a slightly expressive heading system.

Body remains neutral and highly readable.

Script support must be considered for Meitei content.

7.6 Meghalaya Typography

Personality:

Soft
Light
Airy
Modern

Use a clean rounded or humanist sans-serif.

Typography should feel breathable rather than decorative.

## 7.7 Mizoram Typography

Personality:

Rhythmic
Friendly
Confident

Use a readable modern sans-serif with slightly stronger heading personality.

## 7.8 Nagaland Typography

Personality:

Strong
Structured
Grounded

Use a confident heading style.

Body typography remains simple and highly readable.

## 7.9 Tripura Typography 

Personality:

Warm
Artistic
Familiar

Use an approachable heading style with a clean body font.

Bengali script support should be available where required.

## 7.10 Sikkim Typography

Personality:

Calm
Minimal
Spacious
Himalayan

Use a clean modern display style with generous line spacing.

Nepali script support should be available where required.

# 8. Elder-Friendly Type Scale

Starting values:

Element	Size	Weight
Display	40–56px	700
Page title	32–40px	700
Section title	26–32px	700
Large body	20–22px	500
Body	18–20px	500
Button	18–20px	700
Helper	16–18px	500

These are starting values.

The interface must support user/system text scaling.

##8.1 Text Rules

Use:

Short sentences
Familiar words
Sentence case
One idea per line
Generous line height
Strong hierarchy

Avoid:

ALL CAPS
Tiny captions
Dense paragraphs
Medical jargon
Technical terminology
Decorative body fonts

---

# 9. Regional Theme Engine

The Regional Theme Engine is responsible for switching the visual identity
of SMRITI according to the user's selected region.

The user selects a region once during setup.

The preference can later be changed from Settings.


## 9.1 Theme Flow

```text
User selects region
        ↓
Save regional preference
        ↓
Load regional theme
        ↓
Load CSS tokens
        ↓
Load typography
        ↓
Load pattern
        ↓
Load illustrations
        ↓
Load regional content
        ↓
Apply motion personality
        ↓
SMRITI becomes regionally personalized

## 9.2 Theme Object

Recommended TypeScript structure:

type RegionalTheme = {
  id: string;

  name: string;

  colors: {
    primary: string;
    secondary: string;
    accent: string;

    background: string;
    surface: string;

    text: string;
    muted: string;
    border: string;

    success: string;
    warning: string;
    error: string;

    onPrimary: string;
  };

  typography: {
    display: string;
    heading: string;
    body: string;
    ui: string;
  };

  pattern: {
    type: string;
    opacity: number;
    scale: number;
  };

  illustration: {
    style: string;
  };

  motion: {
    personality: string;
    duration: number;
  };

  localization: {
    languages: string[];
    scripts: string[];
  };
};

## 9.3 CSS Theme Switching

Example:

[data-region="assam"] {
  --smriti-primary: #8B2F2F;
  --smriti-secondary: #B8893C;
  --smriti-accent: #D8A84E;

  --smriti-bg: #F7F1E6;
  --smriti-surface: #FFFDF8;

  --smriti-text: #26332F;
  --smriti-muted: #6F756F;
}

[data-region="meghalaya"] {
  --smriti-primary: #3E7166;
  --smriti-secondary: #7896A1;
  --smriti-accent: #D59A61;

  --smriti-bg: #F1F5F2;
  --smriti-surface: #FCFEFD;

  --smriti-text: #273331;
  --smriti-muted: #717B78;
}

The same architecture must be implemented for all eight states.

## 9.4 Theme Transition

Changing region should not instantly flash into another design.

Use:

Background crossfade
+
Pattern transition
+
Typography transition
+
Illustration transition
+
Accent transition

Duration:

300–500ms

Use:

easeInOut

Avoid:

Flashing
Spinning
Zooming entire pages
Screen shaking
Large bounce effects

------------------------------------------------------------------------

# 10. Iconography

Use a friendly, familiar icon set.

Recommended visual characteristics:

-   Rounded stroke
-   Simple silhouette
-   Minimal detail
-   Consistent stroke width
-   Icon + label for important actions

Examples:

**Home**

**Today**

**Memories**

**Activities**

**Help**

Do not make users guess what an icon means.

------------------------------------------------------------------------

# 11. Photography & Illustration

## 11.1 Photography is important

Use real-looking photographs for:

-   Family
-   Food
-   Places
-   Objects
-   Memories
-   Cultural content

The product should not rely entirely on generic illustrations.

------------------------------------------------------------------------

## 11.2 Avoid stock-photo feeling

Avoid images where:

-   People look staged
-   Everyone is unrealistically smiling
-   Healthcare workers pose for the camera
-   Images look like corporate advertisements

Prefer:

-   Real family photos
-   Local environments
-   Familiar objects
-   Community photography
-   Natural lighting

------------------------------------------------------------------------

# 12. Cultural Design

Cultural design should be subtle and authentic.

Do not decorate every screen with regional patterns.

Instead use culture in meaningful places:

### Memory cards

Family photographs.

### Activity content

Local food, objects, names, places.

### Audio

Family-recorded or locally appropriate voices/music.

### Themes

Optional regional content packs.

### Illustration

Small contextual details rather than decorative overload.

The result should say:

> "This understands my world."

not:

> "This app added a North-East theme."

------------------------------------------------------------------------

# 13. Elder Mode

This is the most important interface in the system.

## 13.1 Home screen structure

``` text
┌─────────────────────────────────────┐
│ Good morning, Asha                  │
│ Thursday, 27 August                 │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  💧  Drink some water           │ │
│ │                                 │ │
│ │  [ I've done it ]               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      Today's activity           │ │
│ │                                 │ │
│ │     Remember the family         │ │
│ │                                 │ │
│ │       [ Start ]                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│  [ Memories ]    [ Help ]           │
└─────────────────────────────────────┘
```

The exact implementation may vary, but the principle is fixed:

**Greeting → important reminder → one activity → very small number of
secondary choices.**

------------------------------------------------------------------------

# 14. Elder Navigation

Do not use a complicated bottom navigation with five or six
destinations.

Recommended:

### Home

Today's experience.

### Memories

Personal memory book.

### Activities

Optional activity library.

### Help

Voice/help/caregiver assistance.

The current location should always be obvious.

A clear Home action should always exist because explicit navigation and
a clear route back reduce disorientation. citeturn0search0

------------------------------------------------------------------------

# 15. Primary Button

The primary action should be visually obvious.

### Example

``` text
┌─────────────────────────┐
│                         │
│        Start            │
│                         │
└─────────────────────────┘
```

Rules:

-   Minimum comfortable touch area: 48×48px
-   Prefer larger controls for Elder Mode
-   Strong contrast
-   Short label
-   Icon optional
-   No tiny text links as the only action

------------------------------------------------------------------------

# 16. Activity Screen

The activity screen should remove distractions.

``` text
┌─────────────────────────────────────┐
│ ← Home                         🔊   │
│                                     │
│ Remember these                      │
│                                     │
│       [ PHOTO ] [ PHOTO ]           │
│       [ PHOTO ]                    │
│                                     │
│       Take your time.               │
│                                     │
│              [ Continue ]           │
└─────────────────────────────────────┘
```

### Rules

-   One question
-   One task
-   Large visual content
-   Optional voice
-   No unnecessary score
-   No timer
-   No distracting navigation

------------------------------------------------------------------------

# 17. Correct Answer State

Do not show a huge "CORRECT!!!" animation.

Instead:

``` text
✓ Yes, that's right.

You remembered Rina.
```

Then:

**Continue**

The feedback should feel like encouragement from a person.

------------------------------------------------------------------------

# 18. Incorrect Answer State

Never punish.

Instead:

``` text
That's okay.

Let's look at it again.
```

Options:

**Try again**

**Show me**

The system can automatically simplify the next attempt.

------------------------------------------------------------------------

# 19. Memory Book

The Memory Book should resemble a **real personal album**, not a social
media feed.

### Layout

Large photo.

Name.

Relationship.

Short story.

Optional audio.

Example:

``` text
┌──────────────────────────────┐
│                              │
│          [PHOTO]             │
│                              │
│          Rina                │
│          Your daughter       │
│                              │
│  "This photo was taken       │
│   at the family gathering." │
│                              │
│       🔊 Listen              │
└──────────────────────────────┘
```

------------------------------------------------------------------------

# 20. Memory Chapters

Use physical-album metaphors:

-   My Family
-   My Places
-   My Food
-   My Music
-   My Childhood
-   Important Days

Avoid generic labels such as:

-   AI Memories
-   Knowledge Base
-   Data Collection

------------------------------------------------------------------------

# 21. Voice Interaction

Voice should feel like a gentle assistant.

### Example

> "Good morning, Asha."

Pause.

> "It is time for your morning medicine."

Then:

**Done**

**Remind me later**

------------------------------------------------------------------------

## Voice rules

-   Slow speech
-   Short sentences
-   Natural pauses
-   No robotic announcements
-   Repeat button always available
-   Visual text always accompanies important voice information
-   Touch fallback always available

------------------------------------------------------------------------

# 22. Reminder Cards

Reminder cards should resemble physical reminder notes.

Example:

``` text
┌──────────────────────────────┐
│ 💊                            │
│ Morning medicine             │
│ 9:00 AM                      │
│                              │
│ [ Done ]     [ Later ]       │
└──────────────────────────────┘
```

Do not use alarming red unless something actually requires attention.

------------------------------------------------------------------------

# 23. Caregiver Design System

The caregiver interface can be more information-dense than Elder Mode.

But it should still feel calm.

## Dashboard hierarchy

### First

**How is today going?**

### Second

**What needs attention?**

### Third

**What has changed?**

### Fourth

**Activity details**

This mirrors how a real caregiver thinks.

------------------------------------------------------------------------

# 24. Caregiver Dashboard

Example:

``` text
Good evening, Priya

Asha · Today

┌──────────────┐ ┌──────────────┐
│ Activities   │ │ Reminders    │
│ 2 completed  │ │ 3 / 3        │
└──────────────┘ └──────────────┘

Needs attention

Activity participation is lower
than Asha's usual pattern this week.

[ Check in ]

This week

Picture activities     ●●●●○
Memory activities      ●●●○○
Routine                ●●●●●
```

The dashboard should explain data rather than dumping graphs.

------------------------------------------------------------------------

# 25. "Care Story" Component

This should be a signature component.

Instead of a conventional analytics dashboard:

### This week with Asha

> Asha completed 5 activities this week.\
> She enjoyed picture activities most often.\
> Two evening reminders were missed.

Then:

**View details**

This feels more human and useful than:

> Cognitive Score: 73\
> Engagement Index: 0.61

------------------------------------------------------------------------

# 26. Personal Baseline Visualization

Use the user's own pattern.

Example:

``` text
Asha's usual activity

      Usual
        │
Mon  ███████
Tue  ██████
Wed  ███████
Thu  ████
Fri  ███████

Today is lower than usual.
```

Use language and context alongside the visualization.

Never imply:

> "This proves cognitive decline."

------------------------------------------------------------------------

# 27. Alert Design

Alerts should be rare.

### Good

> **A little different today**
>
> Asha has completed fewer activities than usual this week.
>
> Consider checking in.

**Call Asha**

### Bad

> 🚨 COGNITIVE DECLINE DETECTED 🚨

The second is clinically alarming, potentially misleading, and
inconsistent with the product's role.

------------------------------------------------------------------------

# 28. Family Voice Card

Make it emotionally warm.

``` text
┌─────────────────────────────┐
│ From Rina                   │
│                             │
│ ▶ "Good morning, Ma..."     │
│                             │
│ 23 August · Family message  │
└─────────────────────────────┘
```

Use real voice recordings when possible.

------------------------------------------------------------------------

# 29. Offline State

Do not show a frightening red "No Internet" banner.

Use a quiet status:

> **Working offline**

and later:

> **Synced 5 minutes ago**

If important:

> **Changes will sync when you're connected.**

The user should never lose confidence because the network disappeared.

------------------------------------------------------------------------

# 30. Sync Status

Three states:

### Synced

**✓ Up to date**

### Syncing

**↻ Saving changes**

### Offline

**Offline · Saved on this device**

Avoid technical language such as:

> "Background synchronization failed due to network exception."

------------------------------------------------------------------------

# 31. Empty States

Empty states should guide rather than blame.

### No memories yet

> **Let's add your first memory.**

> Add a family photo, name, or story.

**Add memory**

### No activities today

> **You're all done for today.**

> Take a rest or explore a memory.

------------------------------------------------------------------------

# 32. Error States

Never use developer language.

Bad:

> Error 502

Good:

> **We couldn't save that yet.**

> Your information is still on this device. We'll try again when you're
> connected.

------------------------------------------------------------------------

# 33. Loading States

Avoid long generic spinners.

Use meaningful text:

> **Getting today's activity ready...**

For voice:

> **Preparing your voice instructions...**

------------------------------------------------------------------------

# 34. Motion System

Motion should communicate state, not decorate the interface.

### Use

-   Gentle fade
-   Short slide
-   Small scale transition
-   Progress animation
-   Audio waveform

### Avoid

-   Confetti explosions
-   Fast bouncing
-   Constant floating
-   Parallax
-   Auto-playing backgrounds
-   Flashing

### Duration

Use roughly:

-   Micro interaction: 120--180ms
-   Standard transition: 200--300ms
-   Page transition: 250--350ms

Respect reduced-motion preferences.

------------------------------------------------------------------------

# 35. Game Design Language

The cognitive games should look like activities, not arcade games.

### Avoid

-   Leaderboards
-   Coins
-   XP
-   Lives
-   "Game Over"
-   Competitive rankings

### Prefer

-   "Let's try"
-   "You remembered"
-   "Take your time"
-   "Try again"
-   "You're doing well"

The goal is engagement without anxiety.

------------------------------------------------------------------------

# 36. Personalization

Personalization should be visible in meaningful places.

Examples:

Instead of:

> Welcome back!

Use:

> **Good morning, Asha.**

Instead of:

> Recommended activity

Use:

> **Let's remember the family.**

Instead of:

> Content item 12

Use:

> **Rina's wedding**

This creates emotional ownership.

------------------------------------------------------------------------

# 37. Accessibility Modes

Provide three practical levels.

### Comfortable

Default Elder Mode.

### Large

Larger text and controls.

### Voice-led

More audio guidance and fewer visual decisions.

Do not make users navigate a complicated accessibility settings page.

A caregiver can configure these during setup.

------------------------------------------------------------------------

# 38. Touch Interaction Rules

For Elder Mode:

-   Large touch targets
-   Large spacing
-   Avoid adjacent destructive actions
-   Avoid tiny icons
-   Avoid swipe-only navigation
-   Avoid drag-and-drop unless optional
-   Avoid double-tap requirements
-   Avoid hidden gestures

The interface should work with simple taps.

------------------------------------------------------------------------

# 39. Information Density

### Elder Mode

**Very low density**

One main task per screen.

### Caregiver

**Medium density**

Summary + important actions.

### Healthcare Worker

**Medium/high density**

More structured information because the user is trained and authorized.

Do not force one design onto all three user types.

------------------------------------------------------------------------

# 40. Component Library

The core component library should contain:

### Navigation

-   Home
-   Back
-   Help
-   Voice

### Actions

-   Primary button
-   Secondary button
-   Large choice button
-   Icon button
-   Voice button

### Content

-   Reminder card
-   Memory card
-   Family card
-   Activity card
-   Story card
-   Care Story
-   Trend card

### Feedback

-   Success
-   Retry
-   Offline
-   Syncing
-   Error
-   Attention

### Data

-   Simple progress
-   Baseline chart
-   Weekly activity
-   Reminder status

------------------------------------------------------------------------

# 41. Component Rules

Every component should answer:

1.  What is this?
2.  What can I do with it?
3.  What happens after I tap it?

If those three things are not obvious, simplify the component.

------------------------------------------------------------------------

# 42. Design Tokens

Example token structure:

``` text
color/
  background
  surface
  text
  text-muted
  primary
  primary-pressed
  accent
  success
  warning
  error

type/
  display
  title
  heading
  body-large
  body
  button
  caption

space/
  1
  2
  3
  4
  5
  6
  7
  8

radius/
  small
  medium
  large

motion/
  fast
  normal
  slow
```

The exact implementation can be translated into Flutter, React Native,
or a web design system.

------------------------------------------------------------------------

# 43. Figma Structure

Recommended Figma pages:

``` text
00 — Cover
01 — Foundations
02 — Colors
03 — Typography
04 — Icons
05 — Components
06 — Elder Mode
07 — Caregiver
08 — Healthcare Worker
09 — Cognitive Games
10 — Memory World
11 — Reminders
12 — Voice
13 — Offline & Sync
14 — Accessibility
15 — Prototype Flows
16 — Usability Test Screens
```

------------------------------------------------------------------------

# 44. Core Screens to Design First

Do not design 50 screens immediately.

Start with these 12:

1.  Welcome / setup
2.  Elder Home
3.  Today's Reminder
4.  Cognitive Activity
5.  Correct Answer
6.  Retry / Help
7.  Memory World
8.  Memory Detail
9.  Daily Timeline
10. Caregiver Dashboard
11. Care Story
12. Offline / Sync state

These screens establish almost the entire visual language.

------------------------------------------------------------------------

# 45. Human Usability Testing

This is a critical part of the design system.

The interface should be tested with:

-   Older adults
-   People living with dementia where appropriate and ethically
    supported
-   Family caregivers
-   Community/health workers

Do not only test with developers or college students.

Alzheimer's Society specifically recommends co-creation with people
affected by dementia and gives examples of involving people with lived
experience throughout product development. citeturn0search4

------------------------------------------------------------------------

# 46. Usability Test Tasks

Ask an older adult to perform simple tasks:

### Task 1

> "Can you start today's activity?"

### Task 2

> "Can you find your family photo?"

### Task 3

> "Can you tell me what you need to do next?"

### Task 4

> "Can you remind yourself about this later?"

### Task 5

> "Can you go back home?"

Do not explain where the button is.

Observe.

If they repeatedly ask where to tap, the design is not finished.

------------------------------------------------------------------------

# 47. Human Experience Test

After using the prototype, ask:

-   Did this feel easy?
-   Did anything confuse you?
-   Did anything make you uncomfortable?
-   Did the app feel like a game or a medical test?
-   Did the photos feel familiar?
-   Did you understand what to do next?
-   Would you use this again?
-   What would you remove?

The most important question:

> **"Did this feel like something made for you?"**

------------------------------------------------------------------------

# 48. Design Anti-Patterns

The following should be rejected during design review:

### AI Dashboard Syndrome

Too many:

-   Charts
-   Metrics
-   AI labels
-   Percentages
-   Confidence scores

### SaaS Template Syndrome

Every screen has:

-   Sidebar
-   Header
-   Three cards
-   Gradient
-   Sparkline

### Children's Game Syndrome

Too many:

-   Stars
-   Rewards
-   Confetti
-   Cartoon characters
-   Bright saturated colors

### Hospital Syndrome

Too many:

-   Medical icons
-   Clinical labels
-   Red alerts
-   Patient IDs
-   Clinical terminology

### Social Media Syndrome

Avoid:

-   Infinite feeds
-   Likes
-   Comments
-   Followers
-   Public profiles

------------------------------------------------------------------------

# 49. The "Human Check"

Before shipping a screen, ask:

> If the AI disappeared from the product tomorrow, would this still feel
> like a useful human-centered product?

If the answer is no, the interface is probably too AI-centric.

------------------------------------------------------------------------

# 50. Final Visual Rule

The design should look like it was made by a team that spent time with
families, caregivers, and older adults.

It should feel:

**familiar before intelligent,**

**calm before exciting,**

**personal before technical,**

**useful before impressive.**

The AI should make the experience smarter **without making the interface
look like AI.**

------------------------------------------------------------------------

# 51. Final Design System Summary

### Visual

Warm cream + forest green + restrained terracotta.

### Typography

Large, simple, highly readable sans-serif.

### Layout

Spacious, predictable, low density.

### Interaction

Large taps, one decision at a time.

### Photography

Real, personal, local, natural.

### Motion

Quiet and purposeful.

### Elder Mode

Extremely simple.

### Caregiver Mode

Informative but human.

### Healthcare Mode

Structured and permission-controlled.

### AI

Invisible unless explanation is useful.

### Culture

Authentic content, not decorative stereotypes.

### Accessibility

Designed into the foundation, not added later.

### Emotional goal

The user should feel:

> **"I know where I am. I know what to do. This feels familiar. I am not
> being tested."**

------------------------------------------------------------------------

# 52. Design Quality Gate

A screen is ready only when:

-   [ ] The main action is obvious within 2--3 seconds.
-   [ ] Text is comfortably readable.
-   [ ] Color is not the only way information is communicated.
-   [ ] There is a clear way back.
-   [ ] No unnecessary jargon exists.
-   [ ] There is no unnecessary animation.
-   [ ] The screen does not look like a generic AI dashboard.
-   [ ] The design works without internet-dependent visual elements.
-   [ ] Personal content feels authentic.
-   [ ] The older adult can understand the screen without caregiver
    explanation where intended.
-   [ ] The caregiver can understand important information without
    studying a complex chart.
-   [ ] The design has been tested with real target users before final
    release.

------------------------------------------------------------------------

# 53. Final Design Principle

**Do not design a technology product for old people.**

Design a **good, beautiful, respectful product for a person who happens
to need cognitive support.**

That distinction should guide every screen, component, animation, color,
word, and interaction in this project.
