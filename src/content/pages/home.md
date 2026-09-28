---
title: Sungho Park
description: Ph.D. student at POSTECH working on self-improving AI agents, including automatic harness optimization (AutoSaddler).
photo: ../../assets/profile.jpg
---

I am a Ph.D. student in the [Data Systems Lab](https://dslab.postech.ac.kr/) at [POSTECH](https://www.postech.ac.kr/eng/index.do), advised by [Prof. Wook-Shin Han](https://wscrony.github.io/). My research centers on developing self-improving AI agents, inspired by Sun Tzu’s The Art of War: **"If you know the enemy and know yourself, you need not fear the result of a hundred battles."** I view the path to Artificial General Intelligence (AGI) as rooted in a model's ability to autonomously identify its weaknesses ("knowing oneself") and iteratively enhance its performance.

My recent work, [AutoSaddler](/posts/autosaddler/) (NeurIPS 2026), is a first step in this direction. Making LLM agents reliable on long-horizon tasks usually requires hand-engineering their harness: the prompts, tools, and control logic around the model. AutoSaddler automates this process by learning from the agent's own execution traces. It diagnoses why the agent failed, patches the harness as code, and keeps only the updates that generalize, so that improvements are durable rather than fixes for a single trajectory. Building on this line of research, my goal is to develop systems that continually diagnose their own shortcomings and improve themselves.
