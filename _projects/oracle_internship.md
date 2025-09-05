---
layout: page
title: Oracle Labs NL2SQL
description: Development of NL2SQL Generation Model for Oracle Database
importance: 4
category: internship
---

During my internship at **Oracle Labs** (July 2023 - October 2023), I worked on developing advanced NL2SQL generation models specifically optimized for Oracle Database systems.

## Challenge Identified

Discovered a critical gap in existing NL2SQL benchmarks:
- Representative benchmarks like Spider follow SQLite dialect
- **More than 50%** of queries cannot be executed on Oracle databases
- Existing models performed poorly on Oracle-specific features and syntax

## Solution Development

### Oracle-Specific Dataset Creation
- **SQLGlot Integration**: Used SQLGlot for automated translation from SQLite to Oracle dialect
- **Feature Compatibility**: Excluded SQLite-specific features not supported in Oracle
- **Quality Assurance**: Ensured all translated queries execute correctly on Oracle databases

### Model Optimization Techniques
Implemented multiple fine-tuning approaches:

1. **Hyperparameter Tuning**: Optimized model parameters for Oracle-specific patterns
2. **Prompt Engineering**: Developed zero-shot and few-shot prompting strategies
3. **Parameter-Efficient Fine-Tuning**: Applied PEFT techniques to reduce computational overhead
4. **Dataset Augmentation**: Enhanced training data with Oracle-specific examples

## Results

Achieved **27.4% improvement** in execution accuracy over baseline models, demonstrating the importance of database-specific optimization in NL2SQL systems.

## Technical Skills Developed

- **Database Systems**: Deep understanding of Oracle SQL dialect and features
- **Model Fine-Tuning**: Advanced techniques in language model optimization
- **Prompt Engineering**: Strategic approaches to improving model performance
- **Data Processing**: Large-scale dataset transformation and validation

## Impact

This work highlighted the importance of database-specific considerations in NL2SQL research and provided practical solutions for enterprise database integration.

## Collaboration

Worked closely with Oracle Labs research team, gaining experience in:
- Industrial research methodologies
- Enterprise software requirements
- Large-scale database systems
- Production-ready model development

---

**Learn more:** [Generative AI in Oracle APEX](https://blogs.oracle.com/apex/post/generative-ai-apex-1)