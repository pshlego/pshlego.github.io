---
layout: page
title: HELIOS
description: Harmonizing Early Fusion, Late Fusion, and LLM Reasoning for Multi-Granular Table-Text Retrieval
importance: 1
category: research
related_publications: true
---

**HELIOS** represents a breakthrough in multi-modal information retrieval, specifically targeting the complex challenge of retrieving relevant information from both structured tables and unstructured text simultaneously.

## Key Innovation

HELIOS formulates retrieval as finding a query-relevant subgraph within a bipartite data graph built via early fusion of table segments and passages. The system introduces a three-stage pipeline that strategically integrates:

1. **Early Fusion**: Combining table segments and text passages at the data level
2. **Late Fusion**: Merging retrieval results from different modalities
3. **LLM Reasoning**: Leveraging large language models for complex logical inference

## Problem Statement

Traditional retrieval methods, which rely solely on semantic similarity, struggle with tasks requiring advanced logical inference such as:
- Column-wise aggregation across tables
- Multi-hop reasoning between tables and text
- Complex analytical queries spanning multiple data modalities

## Solution Approach

HELIOS addresses these limitations by:
- **Graph-Based Retrieval**: Modeling the retrieval task as subgraph selection within a bipartite data graph
- **Multi-Granular Processing**: Operating at different levels of granularity for optimal performance
- **Integrated Reasoning**: Incorporating LLM reasoning capabilities to handle complex logical operations

## Results

The optimized retrieval method significantly outperforms existing approaches on benchmark datasets, demonstrating the effectiveness of harmonizing different fusion strategies with advanced reasoning capabilities.

## Publication

Accepted at **ACL 2025 Main** - one of the top venues in computational linguistics and natural language processing.

{% cite park2025helios %}