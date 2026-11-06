import { useRouter } from 'expo-router';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { EvolutionCard } from '@/components/evolution-card';
import { Icon } from '@/components/icon';
import { ErrorState, LoadingState } from '@/components/query-status';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useEvolutionChain } from '@/hooks/use-pokemon';
import { toStages } from '@/utils/evolution';

/**
 * The "Evolution" tab: the chain from the API, one stage after the other.
 * Tapping a Pokémon opens its detail. Has its own loading and error state.
 */
export function EvolutionTab({ speciesId }: { speciesId: number }) {
  const router = useRouter();
  const { data, isPending, isError, error, refetch } = useEvolutionChain(speciesId);

  if (isPending) return <LoadingState compact />;
  if (isError) return <ErrorState compact error={error} onRetry={() => void refetch()} />;

  const stages = toStages(data);
  if (stages.length === 1) {
    return <ThemedText themeColor="textSecondary">This Pokémon does not evolve.</ThemedText>;
  }

  return (
    <View style={styles.chain}>
      {stages.map((stage, index) => (
        <Fragment key={stage.map((entry) => entry.id).join('-')}>
          {index > 0 ? <Icon name="evolutionLink" width={80} height={20} /> : null}
          <View style={styles.stage}>
            {stage.map((entry) => (
              <EvolutionCard
                key={entry.id}
                id={entry.id}
                name={entry.name}
                isCurrent={entry.id === speciesId}
                onPress={() => router.push({ pathname: '/pokemon/[id]', params: { id: entry.id } })}
              />
            ))}
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chain: { gap: Spacing.two },
  stage: { gap: 12 },
});
