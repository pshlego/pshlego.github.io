---
layout: page
title: KDD Cup 2024 Meta CRAG
description: Three-step Question-Answering Framework for Retrieval-Augmented Generation
importance: 2
category: research
related_publications: true
---

**KDD Cup 2024 Meta CRAG Challenge** focused on developing robust retrieval-augmented generation systems. Our team "dRAGonRAnGers" achieved first place in multiple categories through an innovative three-step framework.

## Challenge Overview

The Meta CRAG (Comprehensive RAG Assessment and Generation) challenge aimed to push the boundaries of RAG systems by testing their ability to:
- Handle diverse question types
- Minimize unnecessary retrievals
- Prevent error propagation
- Maintain high accuracy and efficiency

## Our Solution: Three-Step Framework

### Step 1: Latent Knowledge Utilization
- Leverage LLMs' inherent knowledge to reduce unnecessary retrievals
- Identify questions that can be answered without external information
- Optimize computational resources by avoiding redundant operations

### Step 2: Strategic Retrieval
- Deploy targeted retrieval only when necessary
- Use advanced retrieval techniques for complex queries
- Balance precision and recall for optimal results

### Step 3: Verification and Error Prevention
- Implement a verification stage to ensure factual accuracy
- Prevent error propagation from incorrect retrieval results
- Cross-validate generated responses against retrieved information

## Key Achievements

🏆 **First Place** in:
- Comparison question (Tasks 1, 2, and 3)
- Post-processing question (Task 1)

## Impact

The framework demonstrates significant improvements in both accuracy and efficiency, setting new benchmarks for practical RAG applications. The verification mechanism particularly addresses one of the most critical challenges in RAG systems - preventing the propagation of retrieval errors.

## Technical Contributions

- Novel approach to minimize unnecessary retrievals
- Effective error prevention mechanism
- Balanced approach between accuracy and computational efficiency
- Practical framework applicable to real-world scenarios

{% cite park2024kdd %}