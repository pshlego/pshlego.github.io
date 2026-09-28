---
title: Sungho Park
description: Ph.D. student at POSTECH working on self-improving AI agents, including automatic harness optimization (AutoSaddler).
photo: ../../assets/profile.jpg
---

I am a Ph.D. student in the [Data Systems Lab](https://dslab.postech.ac.kr/) at [POSTECH](https://www.postech.ac.kr/eng/index.do), advised by [Prof. Wook-Shin Han](https://wscrony.github.io/). My research centers on developing self-improving AI agents, inspired by Sun Tzu’s The Art of War: **"If you know the enemy and know yourself, you need not fear the result of a hundred battles."** I view the path to Artificial General Intelligence (AGI) as rooted in a model's ability to autonomously identify its weaknesses ("knowing oneself") and iteratively enhance its performance.

My recent work, [AutoSaddler](/posts/autosaddler/) (NeurIPS 2026), turns this idea into a concrete method. LLM agents remain unreliable on long-horizon tasks, and making them robust usually requires hand-engineering their harness: the prompts, tools, and control logic around the model. AutoSaddler automates this by formulating harness improvement as an offline learning problem over the agent's execution traces. It diagnoses failed traces, generates structured patches that treat the harness as code, and keeps only updates that generalize under validation, producing durable improvements rather than trajectory-specific fixes. On GAIA2, SWE-Bench Pro, and Terminal-Bench 2.0, AutoSaddler improves over the base harnesses by 9.0, 9.6, and 10.0 percentage points, respectively.
