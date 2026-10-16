import { JSX, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CARD_BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import { readViewBox, renderIllustration } from '../lib/illustration';
import type { Illustration } from '../model/types';

type IllustrationViewProps = {
  illustration: Illustration;
  caption?: string;
};

export const IllustrationView = ({ illustration, caption }: IllustrationViewProps): JSX.Element => {
  const { colors } = useTheme();
  const { locale, text } = useI18n();
  const xml = useMemo(() => renderIllustration(illustration, colors, locale), [illustration, colors, locale]);
  const viewBox = readViewBox(illustration.svg);
  const aspectRatio = viewBox ? viewBox.width / viewBox.height : 1;

  return (
    <View style={[styles.container, { borderColor: colors.border, backgroundColor: colors.bgCard }]}>
      <View accessible accessibilityRole="image" accessibilityLabel={text(illustration.alt)} style={[styles.image, { aspectRatio }]}>
        <SvgXml xml={xml} width="100%" height="100%" />
      </View>
      {caption ? (
        <AppText variant="caption" tone="secondary">
          {caption}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: CARD_BORDER_RADIUS,
    padding: 12,
    gap: 10,
  },
  image: {
    width: '100%',
  },
});
