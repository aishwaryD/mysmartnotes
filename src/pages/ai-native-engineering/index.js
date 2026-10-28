import React from 'react';
import SubjectIntroduction from '@site/src/components/SubjectIntroduction';
import {getPath} from '@site/src/data/paths';
export default function Page(){return <SubjectIntroduction subject={getPath('ai-native-engineering')}/>;}
