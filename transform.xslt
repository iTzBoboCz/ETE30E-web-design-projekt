<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" omit-xml-declaration="yes" indent="no"/>

  <!-- Root template -->
  <xsl:template match="/healthData">
    <xsl:apply-templates select="institution"/>
  </xsl:template>

  <!-- Institution template -->
  <xsl:template match="institution">
    <xsl:text>{</xsl:text>
    "id": "<xsl:value-of select="@id"/>",
    "name": "<xsl:value-of select="name"/>",
    "address": {
      "street": "<xsl:value-of select="address/street"/>",
      "city": "<xsl:value-of select="address/city"/>",
      "postalCode": "<xsl:value-of select="address/postalCode"/>",
      "country": "<xsl:value-of select="address/country"/>"
    },
    "openingHours": {
      "weekday": {
        "from": "<xsl:value-of select="openingHours/weekday/@from"/>",
        "to": "<xsl:value-of select="openingHours/weekday/@to"/>",
        "days": "<xsl:value-of select="openingHours/weekday"/>"
      },
      "weekend": {
        "from": "<xsl:value-of select="openingHours/weekend/@from"/>",
        "to": "<xsl:value-of select="openingHours/weekend/@to"/>",
        "days": "<xsl:value-of select="openingHours/weekend"/>"
      }
    },
    "social": {
      "facebook": "<xsl:value-of select="social/facebook/@url"/>",
      "twitter": "<xsl:value-of select="social/twitter/@url"/>",
      "instagram": "<xsl:value-of select="social/instagram/@url"/>",
      "threads": "<xsl:value-of select="social/threads/@url"/>"
    },
    "services": [
      <xsl:for-each select="services/service">
        <xsl:sort select="@id"/>
        <xsl:text>{</xsl:text>
          "id": "<xsl:value-of select="@id"/>",
          "appointmentType": "<xsl:value-of select="@appointment"/>",
          "title": "<xsl:value-of select="title"/>",
          "description": "<xsl:value-of select="description"/>",
          "details": {
            "duration": {
              "value": <xsl:value-of select="details/duration"/>,
              "unit": "<xsl:value-of select="details/duration/@unit"/>"
            },
            "price": {
              "amount": <xsl:value-of select="details/price"/>,
              "currency": "<xsl:value-of select="details/price/@currency"/>"
            },
            "staff": {
              "doctor": {
                "id": "<xsl:value-of select="details/staff/doctor/@id"/>",
                "name": "<xsl:value-of select="details/staff/doctor/name"/>",
                "specialty": "<xsl:value-of select="details/staff/doctor/specialty"/>",
                "languages": [
                  <xsl:call-template name="split-languages">
                    <xsl:with-param name="languages" select="details/staff/doctor/@languages"/>
                  </xsl:call-template>
                ]
              }
            }
          }
        <xsl:text>}</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
    ],
    "news": [
      <xsl:for-each select="news/article">
        <xsl:sort select="date" order="descending"/>
        <xsl:text>{</xsl:text>
          "id": "<xsl:value-of select="@id"/>",
          "importance": "<xsl:value-of select="@importance"/>",
          "title": "<xsl:value-of select="title"/>",
          "content": "<xsl:value-of select="content"/>",
          "date": "<xsl:value-of select="date"/>"
        <xsl:text>}</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
    ]
    <xsl:text>}</xsl:text>
  </xsl:template>

  <!-- Language splitter template -->
  <xsl:template name="split-languages">
    <xsl:param name="languages"/>
    <xsl:param name="delimiter" select="' '"/>
    <xsl:choose>
      <xsl:when test="contains($languages, $delimiter)">
        <xsl:text>"</xsl:text><xsl:value-of select="substring-before($languages, $delimiter)"/><xsl:text>"</xsl:text>
        <xsl:if test="substring-after($languages, $delimiter) != ''">
          <xsl:text>, </xsl:text>
          <xsl:call-template name="split-languages">
            <xsl:with-param name="languages" select="substring-after($languages, $delimiter)"/>
          </xsl:call-template>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>"</xsl:text><xsl:value-of select="$languages"/><xsl:text>"</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>