---
layout: page
title: SPARTA
description: Scalable and Principled Benchmark of Tree-Structured Multi-hop QA over Text and Tables
importance: 3
category: research
related_publications: true
---

**SPARTA** introduces a revolutionary approach to creating benchmarks for multi-hop question answering that spans both structured tables and unstructured text. This work addresses the critical need for standardized evaluation in multi-modal QA systems.

## Innovation

SPARTA presents a fully automated SQL-centric pipeline that constructs tree-structured multi-hop QA benchmarks by unifying structured and unstructured evidence from tables and text into a single relational representation.

## Key Features

### Automated Pipeline
- **SQL-Centric Design**: Leverages SQL's expressive power for complex query construction
- **Tree-Structured Reasoning**: Models multi-hop reasoning as traversable tree structures
- **Cross-Modal Integration**: Seamlessly combines tabular and textual evidence

### Scalability
- **Fully Automated**: Reduces human annotation requirements
- **Principled Construction**: Ensures consistent quality across generated benchmarks
- **Extensible Framework**: Adaptable to various domains and data types

## Technical Approach

The system transforms the challenge of multi-modal QA into a unified relational framework where:
1. **Tables** provide structured factual information
2. **Text** offers contextual and descriptive details
3. **SQL Queries** define the reasoning paths required to answer questions

## Impact on Research

SPARTA addresses several critical challenges in the field:
- **Benchmark Standardization**: Provides consistent evaluation metrics
- **Multi-Modal Integration**: Advances techniques for combining different data modalities
- **Reasoning Complexity**: Enables evaluation of sophisticated multi-hop reasoning capabilities

## Applications

The framework enables researchers to:
- Evaluate multi-modal QA systems consistently
- Generate large-scale benchmarks efficiently
- Study complex reasoning patterns across modalities
- Advance the field of structured and unstructured data integration

## Status

Currently under review, representing cutting-edge research in automated benchmark generation for multi-modal question answering systems.

{% cite park2024sparta %}